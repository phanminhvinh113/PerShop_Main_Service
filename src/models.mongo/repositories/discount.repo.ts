import { Types } from 'mongoose'
import { unGetSelectData } from '../../utils/index.utils'
import { discountModel } from '../discount.model'
//
interface DiscountRepoType {
   code: string
   shopId: string
   discountId: string
   // products?: ProductType[]
}
export const findAllDiscountCodeUnSelect = async ({ limit, sort, page, filter, unselect }: any) => {
   //
   const skip: number = (page - 1) * limit
   const sortBy: any = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
   const discounts = await discountModel.find(filter).skip(+skip).sort(sortBy).limit(+limit).select(unGetSelectData(unselect)).lean()
   //
   return discounts
}

export const checkDiscountExist = async ({ code, shopId, discountId }: DiscountRepoType) => {
   return await discountModel
      .findOne({
         _id: new Types.ObjectId(discountId),
         code,
         shop_id: new Types.ObjectId(shopId),
      })
      .lean()
}
