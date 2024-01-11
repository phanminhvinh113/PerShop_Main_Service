import mongoose, { Schema, Types } from 'mongoose'
// Declare the Schema of the Mongo model
export interface inventoryType {
   inv_productId: string | object
   inv_stock: number
   inv_location: string
   inv_shopId: string | object
   inv_reservation: any[] | object
}
export interface reservationType {
   cartId: string | Types.ObjectId
   quantity: number
   createOn: Date | string
}
const reservationSchema = new mongoose.Schema<reservationType>(
   {
      cartId: { type: Schema.Types.ObjectId, require: true },
      quantity: { type: Number, required: true },
   },
   {
      timestamps: { createdAt: 'createOn', updatedAt: 'modifiedOn' },
      _id: false,
   }
)
const inventorySchema = new mongoose.Schema<inventoryType>(
   {
      inv_productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      inv_stock: { type: Number, require: true },
      inv_location: { type: String },
      inv_shopId: { type: Types.ObjectId, ref: 'User' },
      inv_reservation: { type: [reservationSchema], default: [] },
   },
   {
      collection: '_Inventory',
      timestamps: { createdAt: 'createOn', updatedAt: 'modifiedOn' },
   }
)

//Export the model
export const inventoryModel = mongoose.model<inventoryType>('Inventory', inventorySchema)
