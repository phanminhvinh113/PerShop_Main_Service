import { Types } from 'mongoose'

export interface ProductType {
   productId: string | Types.ObjectId
   name: string
   type: string[] | string
   thumb: string
   description: string
   isDaft: boolean
   isPublic: boolean
   price: number
   quantity: number
   shop_id: Types.ObjectId | string
   shop: string
   discount: number
   sold: number
   stock: number
   attributes: object
   product_rating: object | number
   product_variations: object
   product_slug: string | null
}
export interface ClothingType {
   brand: string
   size_chart: object | string[] | number[]
   material: string
   shop_id: Types.ObjectId | string
}
export interface ElectronicType {
   manufactory: string
   size_chart: object | string[] | number[]
   material: string
   shop_id: string | Types.ObjectId
}
export interface FurnitureType {
   brand: string
   size_chart: object | string[] | number[]
   material: string
   shop_id: string | Types.ObjectId
}
export interface LaptopType {
   shop_id: string | Types.ObjectId
   brand: string
   cpu: string
   disk: number
   camera: string
   screen_size: number
   ram: number
   graphics_card: string
   special_features: string[]
   material: string
}
export interface PhoneType {
   shop_id: string | Types.ObjectId
   brand: string
   demand: string[]
   chip: string
   memory: string
   camera: string
   sweep_frequency: number
   screen_size: number
   screen_type: string
   ram: number
   special_features: string[]
   operating_system: string
   material: string
}
/////////////////////////////////////
export interface DiscountUserUsed {
   user_id: Types.ObjectId | string
   amount: number
}
export interface DiscountType {
   _id: Types.ObjectId | string
   code_id: Types.ObjectId | string
   shop_id: string | Types.ObjectId
   name: string
   description: string
   type: string
   value: string | number
   code: string
   start_date: any
   end_date: any
   max_quantity: number
   amount_user_used: number
   maximum_amount_per_user: number
   user_used: DiscountUserUsed[]
   min_order_value: number
   is_active: boolean
   apply_to_products: string[] | object | string
   product_ids_apply: string[]
}
export interface CartProductType {
   product_id: Types.ObjectId | string
   shop_id?: Types.ObjectId | string
   quantity: number
   old_quantity?: number
   name?: string
   description?: string
   type?: string
   thumb?: string
   price?: number
   discount?: number
   type_commodity?: object
}
export interface CartType {
   cart_state: string
   cart_products: CartProductType[]
   cart_quantity: number
   cart_count_product: number
   cart_userId: object | string
}

export interface orderModelType {
   order_userId: string | object
   order_checkout: orderCheckoutType
   order_shipping: orderShippingType
   order_products: orderProducts[]
   order_payment: object
   order_tracking: string
   order_status: string
}
export interface orderCheckoutType {
   totalPrice: number
   totalApplyDiscount: number
   feeShip: number
}
export interface orderShippingType {
   street: string
   village: string
   commune: string
   ward: string
   district: string
   city: string
   country: string
   state: string
}
export interface orderProducts {
   productId: string
   price: number
   quantity: number
}
