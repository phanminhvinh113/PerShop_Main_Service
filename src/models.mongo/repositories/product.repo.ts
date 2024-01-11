import { Types } from 'mongoose'
import { ProductModel } from '../product.model'
import { BadRequestError, NotFoundError } from '../../core/error.response'
import { StatusCode } from '../../utils/constant'
import { getSelectData, unGetSelectData } from '../../utils/index.utils'
import { ProductType } from '../interface.model'

//
const queryProduct = async (query: object, skip: number, limit: number) => {
   return await ProductModel.find(query).populate('shop_id', 'name email _id').sort({ updatedAt: -1 }).skip(skip).limit(limit).lean().exec()
}
//
export const findAllDaftForShop = async ({ query, skip, limit }: { query: object; skip: number; limit: number }) => {
   return await queryProduct(query, skip, limit)
}
export const findAllPublicForShop = async ({ query, skip, limit }: { query: object; skip: number; limit: number }) => {
   return await queryProduct(query, skip, limit)
}
//
export const publicProductByShop = async (shop_id: string, product_id: string) => {
   if (!shop_id || !product_id) throw new BadRequestError('Missing parameter')
   //
   const foundShop = await ProductModel.findOne({
      shop_id: new Types.ObjectId(shop_id),
      _id: product_id,
   })
   //
   if (!foundShop) throw new NotFoundError('Not Found!')
   foundShop.isDaft = false
   foundShop.isPublic = true
   const { modifiedCount } = await foundShop.updateOne(foundShop)
   return modifiedCount
      ? {
           code: 0,
           status: StatusCode.SUCCESS,
           message: 'OK!',
        }
      : {
           code: -1,
           status: StatusCode.FORBIDDEN,
           message: 'FAILED!',
        }
}
export const findAllProduct = async ({ limit, sort, filter, page, select }: any) => {
   //
   const skip: number = (page - 1) * limit
   const sortBy: any = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
   const products = await ProductModel.find(filter).skip(skip).sort(sortBy).limit(limit).select(getSelectData(select)).lean()
   //
   return products
}
export const searchProduct = async (keySearch: string) => {
   const regexSearch: any = new RegExp(keySearch)
   const results: any = await ProductModel.find({ $text: { $search: regexSearch } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .lean()
   //
   return {
      code: 0,
      status: StatusCode.SUCCESS,
      message: 'OK',
      data: results,
   }
}

export const findProductById = async (productId: any, unselect: any) => {
   return await ProductModel.findOne({ _id: new Types.ObjectId(productId) }, unGetSelectData(unselect)).lean()
}

export const checkProductByServer = async (products: ProductType[]) => {
   return await Promise.all(
      products.map(async (product: ProductType) => {
         const foundProduct: any = await findProductById(product.productId, ['createdAt,updatedAt'])
         return foundProduct
            ? {
                 price: foundProduct.price,
                 quantity: product.quantity,
                 productId: product.productId,
              }
            : null
      })
   )
}
