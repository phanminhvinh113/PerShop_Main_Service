import mongoose, { Schema } from 'mongoose'
import { orderModelType, orderProducts } from './interface.model'
import { orderStatusEnum } from '..//utils/constant'
//
const orderProductsSchema = new mongoose.Schema<orderProducts>(
   {
      productId: { type: String, require: true },
      price: { type: Number, require: true },
      quantity: { type: Number, require: true },
   },
   {
      _id: false,
   }
)

const orderSchema = new mongoose.Schema<orderModelType>(
   {
      order_userId: { type: Schema.Types.ObjectId, ref: 'User' },
      order_checkout: {
         totalPrice: { type: Number, require: true },
         totalApplyDiscount: { type: Number, require: true },
         feeShip: {
            type: Number,
            require: true,
            default: 0,
         },
      },
      order_shipping: {
         street: String,
         village: String,
         commune: String,
         ward: String,
         district: String,
         city: { type: String, require: true },
         country: { type: String, require: true },
         state: { type: String, require: true },
      },
      order_payment: { type: Object },
      order_products: { type: [orderProductsSchema], default: [], require: true },

      order_tracking: { type: String, default: '#0000000000' },
      order_status: { type: String, enum: orderStatusEnum, default: 'pending' },
   },
   {
      collection: '_Order',
      timestamps: {
         createdAt: 'createOn',
         updatedAt: 'modifiedOn',
      },
   }
)

//Export the model
export default mongoose.model<orderModelType>('Order', orderSchema)
