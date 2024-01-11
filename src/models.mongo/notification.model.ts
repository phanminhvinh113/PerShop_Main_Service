import mongoose, { Schema, Types } from 'mongoose' // Erase if already required
//
enum TypeOfNotification {
   newOrder = 'ORDER-001',
   cancelOrder = 'ORDER-002',
   newPromotion = 'PROMOTION-001',
   expirePromotion = 'PROMOTION-002',
   newProductShop = 'SHOP-001',
   discountShop = 'SHOP-002',
}
// Declare the Schema of the Mongo model
export interface notificationModelType {
   notify_type: string
   notify_sender_id: Types.ObjectId
   notify_receive_id: Types.ObjectId
   notify_content: string
   notify_options: object
}
//
const DOCUMENT_NAME = 'Notification'
const COLLECTION_NAME = '_Notification'
//
const notificationSchema = new mongoose.Schema<notificationModelType>(
   {
      notify_type: { type: String, enum: Object.values(TypeOfNotification), require: true },
      notify_sender_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
      notify_content: { type: String, required: true },
      notify_options: { type: Object, default: {} },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
)

//Export the model
const notificationModel = mongoose.model<notificationModelType>(DOCUMENT_NAME, notificationSchema)

export default notificationModel
