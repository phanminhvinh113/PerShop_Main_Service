import { Types } from 'mongoose'
import { BadRequestError, ConflictRequestError, NotFoundError } from '../../core/error.response'
import cartModel from '../../models.mongo/cart.model'
import { CartProductType } from '../../models.mongo/interface.model'
import { StatusCode } from '../../utils/constant'
import { findCartUserAndUpdate } from '../../models.mongo/repositories/cart.repo'
import { findProductById } from '../../models.mongo/repositories/product.repo'

interface CartServiceType {
   userId: string
   product?: CartProductType
   productId?: string
   list_product_id?: string[]
   type?: string
   old_quantity?: number
   type_commodity?: string
}
class CartService {
   async addToCart({ userId, product }: CartServiceType) {
      if (!userId || !product) throw new BadRequestError('Missing Parameter')
      //
      const unselect = ['quantity', 'shop', 'stock', 'sold', '_id', 'attributes', 'createdAt', 'updatedAt', '__v', 'product_rating']
      //
      const [cartUser, findProduct] = await Promise.all([
         cartModel.findOne({ cart_userId: new Types.ObjectId(userId) }).lean(),
         findProductById(product?.product_id, unselect),
      ])
      //
      if (!findProduct) throw new NotFoundError('Not Found Item')
      //
      const product_cart: any = { ...product, ...findProduct }
      if (!cartUser) {
         const addCart = await cartModel.findOneAndUpdate(
            { cart_userId: userId },
            { $addToSet: { cart_products: product_cart }, cart_count_product: 1, cart_quantity: product.quantity },
            { upsert: true, new: true }
         )
         if (!addCart) throw new BadRequestError('Failed Add Cart!')
      }
      if (cartUser) {
         const updateCart = await findCartUserAndUpdate({ userId, product: product_cart })
         if (!updateCart) throw new ConflictRequestError('Failed To Updated! Try Again')
      }
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
      }
      //
   }
   async updateProductQuantity({ userId, productId, type }: CartServiceType) {
      let incr_value
      if (type === 'reduce') {
         incr_value = -1
      }
      if (type === 'increase') {
         incr_value = 1
      }
      const findCart = await cartModel.findOneAndUpdate(
         {
            cart_userId: userId,
            cart_state: 'active',
            'cart_products.product_id': productId,
         },
         {
            $inc: { 'cart_products.$.quantity': incr_value, cart_quantity: incr_value },
         },
         {
            new: true,
         }
      )
      if (!findCart) throw new BadRequestError('Not Found!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
      }
   }
   async deleteCartItemById({ userId, list_product_id }: CartServiceType) {
      const deleteItem = await cartModel.findOneAndUpdate(
         {
            cart_userId: new Types.ObjectId(userId),
            cart_state: 'active',
         },
         {
            $pullAll: { cart_products: { product_id: list_product_id } },
         },
         {
            new: true,
         }
      )
      if (!deleteItem) throw new BadRequestError('Not Found!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
      }
   }
   //
   async deleteItemAllCart({ userId }: CartServiceType) {
      const cartUser = await cartModel.findOneAndUpdate(
         { cart_userId: new Types.ObjectId(userId) },
         { cart_products: [], cart_quantity: 0, cart_count_product: 0 },
         { new: true }
      )
      if (!cartUser) throw new BadRequestError('Not Found!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
      }
   }
   //
   async getListCartItem({ userId }: { userId: string }) {
      return await cartModel.findOne({ cart_userId: new Types.ObjectId(userId) }).lean()
   }
}
export default new CartService()
