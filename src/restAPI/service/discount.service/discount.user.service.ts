import { discountModel } from '../../../models.mongo/discount.model'
import { BadRequestError, ConflictRequestError, ForbiddenError, NotFoundError } from '../../../core/error.response'
import { DiscountType, DiscountUserUsed, ProductType } from '../../../models.mongo/interface.model'
import { StatusCode } from '../../../utils/constant'
import { checkDiscountExist } from '../../../models.mongo/repositories/discount.repo'

// //

interface DiscountServiceType {
   code: string
   shopId: string
   products: ProductType[]
   userId: string
   discountId: string
   _id?: string
   page?: number
   limit?: number
}
//
class DiscountUserService {
   async getDiscountAmountByUser({ code, shopId, userId, products, discountId }: DiscountServiceType) {
      //
      const foundDiscount: DiscountType | null = await checkDiscountExist({ code, shopId, discountId })
      if (!foundDiscount) throw new NotFoundError('Not Found Discount!')
      //
      const {
         is_active,
         max_quantity,
         start_date,
         end_date,
         min_order_value,
         maximum_amount_per_user,
         user_used,
         type,
         value,
         amount_user_used,
         apply_to_products,
         product_ids_apply,
      } = foundDiscount
      // Check Discount Permission For Product
      if (apply_to_products === 'specific') {
         products.forEach((product) => {
            if (typeof product?.productId === 'string' && !product_ids_apply.includes(product.productId))
               throw new BadRequestError('Discount does not apply for product!')
         })
      }
      if (!is_active) throw new NotFoundError('Discount Expired!')
      // Check Amount Allowed Use
      if (max_quantity > 0 && amount_user_used >= max_quantity) throw new NotFoundError('Discount are out!')
      // Check Time Range Of Discount
      if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) throw new NotFoundError('Discount Not Ready!')
      // Calc Total Price
      let totalOrder: number = 0
      if (min_order_value > 0 && products.length && Array.isArray(products)) {
         totalOrder = products?.reduce((acc: number, product) => acc + product.price * product.quantity, 0)
      }
      if (totalOrder < min_order_value) throw new BadRequestError(`Discount require a minimum  value of  ${min_order_value}`)
      // Find User In List User Take Discount
      const userUsesDiscount: DiscountUserUsed | undefined = user_used?.find((user: DiscountUserUsed) => userId === user.user_id.toString())
      //
      if (userUsesDiscount && userUsesDiscount.amount >= maximum_amount_per_user) throw new ForbiddenError('Exceed the amount allowed for use!')
      // Update Amount Discount (User Exist)
      if (userUsesDiscount) {
         const result = await discountModel.findOneAndUpdate(
            {
               _id: discountId,
               code,
               shop_id: shopId,
               is_active: true,
               'user_used.user_id': userId,
               amount_user_used: { $lt: max_quantity },
            },
            { $inc: { 'user_used.$.amount': 1, amount_user_used: 1 } },
            { new: true }
         )
         if (!result) throw new BadRequestError('Discount Expired! Try again')
      }
      // Put User On List User Used Discount(User not exist)
      if (!userUsesDiscount) {
         const result = await discountModel.findOneAndUpdate(
            { _id: foundDiscount._id, is_active: true, amount_user_used: { $lt: max_quantity } },
            {
               $push: { user_used: { user_id: userId, amount: 1 } },
               $inc: { amount_user_used: 1 },
            },
            { new: true }
         )
         if (!result) throw new BadRequestError('Something Wrong! Try again')
      }

      let amount_money_discount: number = 0
      if (type === 'percentage') amount_money_discount = totalOrder * (+value / 100)
      if (type === 'fix amounted') amount_money_discount = +value
      //
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         discount: +value,
         totalOrder,
         totalDiscount: amount_money_discount,
         totalPrice: totalOrder - amount_money_discount > 0 ? totalOrder - amount_money_discount : 0,
      }
      //
   }
   // CANCEL
   async cancelDiscountCode({ code, shopId, discountId, userId }: DiscountServiceType) {
      const foundDiscount = await checkDiscountExist({ code, shopId, discountId })
      if (!foundDiscount) throw new NotFoundError('Not Found Discount!')
      const result = await discountModel.findByIdAndUpdate(foundDiscount._id, {
         $push: {
            user_used: userId,
         },
         $inc: {
            amount_user_used: -1,
            max_quantity: 1,
         },
      })
      if (!result) throw new ConflictRequestError('Something Wrong! Try Again')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'Cancel Success!',
      }
   }
}
//
export default new DiscountUserService()
