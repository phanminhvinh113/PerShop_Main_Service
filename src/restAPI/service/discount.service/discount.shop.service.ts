import { discountModel } from '../../../models.mongo/discount.model'
import { BadRequestError, ConflictRequestError, NotFoundError } from '../../../core/error.response'
import { DiscountType, ProductType } from '../../../models.mongo/interface.model'
import { Types } from 'mongoose'
import { StatusCode } from '../../../utils/constant'
import { findAllProduct } from '../../../models.mongo/repositories/product.repo'
import { checkDiscountExist, findAllDiscountCodeUnSelect } from '../../../models.mongo/repositories/discount.repo'
import { HistoryDiscountModel } from '../../../models.mongo/history.discount.model'
//
interface DiscountServiceType {
   code: string
   shopId: string
   products: ProductType[]
   page: number
   limit: number
   userId: string
   discountId: string
}
//
class DiscountShopService {
   async createDiscountCode(payload: DiscountType) {
      const {
         code,
         start_date,
         end_date,
         apply_to_products,
         max_quantity,
         maximum_amount_per_user,
         product_ids_apply,
         min_order_value,
         shop_id,
         type,
         value,
         description,
         is_active,
         name,
      } = payload
      //
      if (new Date() > new Date(start_date) || new Date() > new Date(end_date) || new Date(start_date) >= new Date(end_date)) {
         throw new BadRequestError('Wrong Time For Discount!')
      }
      const foundDiscount = await discountModel.findOne({ code, shop_id }).lean()
      if (foundDiscount && foundDiscount.is_active) throw new BadRequestError('Discount Is Active!')
      //
      if (apply_to_products === 'specific' && !product_ids_apply) throw new BadRequestError('Pick Product!')
      //
      const newDiscount = await discountModel.create({
         name,
         type,
         value,
         code,
         description,
         is_active,
         shop_id,
         start_date: new Date(start_date),
         end_date: new Date(end_date),
         apply_to_products,
         product_ids_apply,
         max_quantity,
         maximum_amount_per_user,
         min_order_value,
      })
      //
      if (!newDiscount) throw new ConflictRequestError('Failed!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
         data: newDiscount,
      }
   }
   async updateDiscountCode() {}
   async getAllDiscountCodeWithProduct(payload: DiscountServiceType) {
      const { code, shopId, limit, page, discountId } = payload
      //
      const findDiscount: DiscountType | null = await checkDiscountExist({ code, shopId, discountId })
      if (!findDiscount || !findDiscount.is_active) throw new NotFoundError("Discount Doesn't Exist!")
      //
      const { apply_to_products, product_ids_apply } = findDiscount
      //
      let filter
      if (apply_to_products === 'all') {
         filter = {
            shop_id: shopId,
            isPublic: true,
         }
      }
      if (apply_to_products === 'specific') {
         filter = {
            _id: { $in: product_ids_apply },
            isPublic: true,
         }
      }
      //
      const products: object = await findAllProduct({
         filter,
         limit: +limit,
         page: +page,
         sort: 'ctime',
         select: ['name'],
      })
      if (!products) throw new BadRequestError('Failed!')
      //
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'OK!',
         data: products,
      }
   }
   async getAllDiscountCodeByShop(payload: any) {
      try {
         const { shopId, limit, page }: { shopId: string; limit: number; page: number } = payload
         const filter = { shop_id: new Types.ObjectId(shopId) }
         const unselect = ['__v']
         const discounts = await findAllDiscountCodeUnSelect({ limit, filter, page, unselect, sort: 'ctime' })
         //
         return {
            code: 0,
            status: StatusCode.SUCCESS,
            message: 'OK!',
            data: discounts,
         }
      } catch (error) {
         throw new Error(error)
      }
   }
   //DELETE DISCOUNT
   // BEST WAY IS MOVE ON TO ANOTHER DB
   async deleteDiscountCode({ code, shopId, discountId }: DiscountServiceType) {
      //
      const foundDiscount = await checkDiscountExist({ code, shopId, discountId })
      if (!foundDiscount) throw new NotFoundError('Not Found Discount!')
      //CHECK SOMETHING BEFORE DELETE AND MOVE ON DIFF DATABASE
      // .....................
      // DELETE
      const deleted = await discountModel
         .findByIdAndDelete({
            code,
            _id: new Types.ObjectId(discountId),
            shop_id: shopId,
         })
         .lean()
      if (!deleted) throw new NotFoundError('Can not delete Discount!')
      //MOVE ON
      const history_discount = await HistoryDiscountModel.create(foundDiscount)
      if (!history_discount) throw new ConflictRequestError('Some thing Wrong! try again!', StatusCode.CONFLICT)
      //
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         message: 'DELETED!',
      }
   }
}
//
export default new DiscountShopService()
