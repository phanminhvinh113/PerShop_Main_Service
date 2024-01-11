import orderModel from '../../models.mongo/order.model'
import { BadRequestError, ConflictRequestError, NotFoundError } from '../../core/error.response'
import { findCartId, removeProductsInCart } from '../../models.mongo/repositories/cart.repo'
import { getAllOrderByUser, getOneOrderByUser, updateStatusOrder } from '../../models.mongo/repositories/checkout.repo'
import { ROLES, StatusCode, orderStatus } from '../../utils/constant'
import { acquireLock, releaseLock } from './redis/redis.init.service'
import { checkProductByServer } from '../../models.mongo/repositories/product.repo'
import discountUserService from './discount.service/discount.user.service'
import { CheckoutServiceType, OrderByUserType, ProductServeType } from '../interface/checkout.interface'
import { Types } from 'mongoose'
import { findUserByRole } from './user.service'

//
class CheckoutService {
   //
   public async CheckoutReview({ userId, cartId, shop_order_ids }: CheckoutServiceType) {
      // Check Cart Of User
      const foundCart = await findCartId(userId, cartId)
      if (!foundCart) throw new BadRequestError('Not Found Cart!')
      // Create Review Order Before Submit
      const shop_orders_ids_new: any[] = []
      //
      let checkoutOrder = {
         totalOrder: 0,
         totalDiscount: 0,
         totalPrice: 0,
      }
      // Calculation Total Bill
      for (let i = 0; i < shop_order_ids.length; i++) {
         const { shopId, shop_discounts, item_products } = shop_order_ids[i]
         // Check Product Available
         const productServer: any[] = await checkProductByServer(item_products)
         //Check to see if any products are not accepted
         if (!productServer || productServer.includes(null)) throw new BadRequestError('Order Wrong!')
         //Calc Total Price (Not Includes Discount)
         const totalCheckout = productServer.reduce((acc, product) => acc + product.price * product.quantity, 0)
         // Check Amount And Calc Discount for Item Product
         if (shop_discounts.length > 0 && productServer) {
            //get amount discount
            for (let i = 0; i < shop_discounts.length; i++) {
               const { code, discountId } = shop_discounts[i]
               const { discount, totalDiscount, totalPrice } = await discountUserService.getDiscountAmountByUser({
                  code,
                  shopId,
                  userId,
                  discountId,
                  products: productServer,
               })
               //
               checkoutOrder.totalOrder += totalCheckout
               checkoutOrder.totalDiscount += totalDiscount
               checkoutOrder.totalPrice += totalPrice
               //
               shop_orders_ids_new.push({
                  shopId,
                  products: productServer,
                  totalCheckout,
                  discount,
                  totalDiscount,
                  totalPrice,
               })
            }
         }
         if (!shop_discounts.length) {
            //
            checkoutOrder.totalOrder += totalCheckout
            checkoutOrder.totalPrice += totalCheckout
            //
            shop_orders_ids_new.push({
               products: productServer,
               totalCheckout,
               discount: 0,
               totalDiscount: 0,
               totalPrice: totalCheckout,
            })
         }
      }
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         shop_order_ids,
         shop_orders_ids_new,
         checkoutOrder,
      }
   }
   public async OrderByUser({ shop_order_ids, cartId, userId, userAddress = {}, userPayment = {} }: OrderByUserType) {
      //
      const { shop_orders_ids_new, checkoutOrder } = await this.CheckoutReview({ userId, cartId, shop_order_ids })
      //
      console.log('product_available', shop_orders_ids_new)
      // Check Again , Check to see if the product is still in stock!!!
      const products: ProductServeType[] = shop_orders_ids_new.flatMap((order) => order.products)
      //
      console.log('PRODUCT::::', products)
      //
      const acquireProduct: boolean[] = []
      //
      if (!products || !products?.length) throw new ConflictRequestError('Order Error!')
      //
      let keyLock: string = ''
      //
      for (let i = 0; i < products.length; i++) {
         const { productId, quantity } = products[i]
         keyLock = await acquireLock(productId, quantity, cartId)
         acquireProduct.push(keyLock ? true : false)
      }
      //If there exists an out-of-stock product

      if (acquireProduct.includes(false)) throw new BadRequestError('Some Products Updated!, Please Back To Cart')
      //Add Into Order
      const new_order = await orderModel.create({
         order_userId: userId,
         order_checkout: checkoutOrder,
         order_payment: userPayment,
         order_shipping: userAddress,
         order_products: products,
         order_status: 'pending',
      })
      //
      if (!new_order) throw new ConflictRequestError('Error Order! Check Again!')
      // Remove Product In Carts
      const remove_products = await removeProductsInCart({ userId, cartId, products })
      //
      if (!remove_products.modifiedCount || !remove_products) throw new ConflictRequestError('Cannot Order, Please Try Again!')
      //
      if (remove_products && remove_products.modifiedCount) {
         const result_release = await releaseLock(keyLock)
         if (!result_release) throw new ConflictRequestError('Config Order!')
      }
      //
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         data: shop_orders_ids_new,
      }
   }
   // USER //
   public async getOrderByUser(userId: string) {
      if (!userId) throw new BadRequestError('Missing User!')
      // FIND ALL PRODUCT ORDER BY USER
      const order = await getAllOrderByUser(userId)
      // ERROR WHEN NOT FOUND
      if (!order) throw new NotFoundError('Not Found!')
      //RES
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         data: order,
      }
   }
   // USER //
   public async getOneOrderByUser(userId: string, orderId: string) {
      //
      if (!userId) throw new BadRequestError('Missing User!')
      // FIND ALL PRODUCT ORDER BY USER
      const order = await getOneOrderByUser(userId, orderId)
      // ERROR WHEN NOT FOUND
      if (!order) throw new NotFoundError('Not Found!')
      //RES
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         data: order,
      }
   }
   // USER //
   public async cancelOrderByUser(userId: string, orderId: string) {
      const cancelled_order = await orderModel.findOneAndUpdate(
         {
            _id: new Types.ObjectId(orderId),
            order_userId: new Types.ObjectId(userId),
            order_status: orderStatus.Pending,
         },
         {
            $set: { order_status: orderStatus.Cancelled },
         },
         {
            new: true,
         }
      )
      //
      if (!cancelled_order) throw new NotFoundError('Not Found!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
      }
      //
   }
   // SHOP
   public async updateOrderStatusByShop(shopId: string, orderId: string) {
      //
      const shop = await findUserByRole(shopId, ROLES.SELLER)
      if (!shop) throw new NotFoundError('Not Found!')
      //
      const updateStatus = await updateStatusOrder({
         orderId,
         statusBefore: orderStatus.Pending,
         statusAfter: orderStatus.Confirmed,
      })
      //
      if (!updateStatus) throw new ConflictRequestError('Error Update!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
      }
      //
   }
}
export default new CheckoutService()
