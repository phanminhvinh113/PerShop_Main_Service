import mongoose, { Schema, Types } from 'mongoose' // Erase if already required

// Declare the Schema of the Mongo model
export interface commentModelType {
   product_id: Types.ObjectId
   user_id: Types.ObjectId
   content: string
   comment_left: number
   comment_right: number
   parent_id: Types.ObjectId | null
   is_deleted: boolean
}
//
const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = '_Comment'
//
const commentSchema = new mongoose.Schema<commentModelType>(
   {
      product_id: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
      user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
      content: { type: String, required: true, default: '' },
      comment_left: { type: Number, require: true },
      comment_right: { type: Number, require: true },
      parent_id: { type: Schema.Types.ObjectId, ref: 'Comment', require: true, default: null },
      is_deleted: { type: Boolean, default: false },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
)

//Export the model
const commentModel = mongoose.model<commentModelType>(DOCUMENT_NAME, commentSchema)

export default commentModel
