import { Types } from 'mongoose'
import { ProductType } from '../../models.mongo/interface.model'

//
export interface CheckoutServiceType {
   userId: string
   cartId: string
   shop_order_ids: ShopOrderType[]
}
//
export interface DiscountOrder {
   discountId: string
   code: string
}
//
export interface ShopOrderType {
   shopId: string
   shop_discounts: DiscountOrder[]
   item_products: ProductType[]
}
//
export interface OrderByUserType {
   shop_order_ids: ShopOrderType[]
   cartId: string
   userId: string
   userAddress: object
   userPayment: string | object
}

export interface ProductServeType {
   productId: Types.ObjectId | string
   price: number
   quantity: number
}
