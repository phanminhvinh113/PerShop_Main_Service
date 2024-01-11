import mongoose, { Schema } from 'mongoose' // Erase if already required
import { DiscountType, DiscountUserUsed } from './interface.model'

// Declare the Schema of the Mongo model
const userUsedSchema = new mongoose.Schema<DiscountUserUsed>(
   {
      user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      amount: { type: Number, required: true },
   },
   {
      _id: false,
   }
)

const discountSchema = new mongoose.Schema<DiscountType>(
   {
      shop_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
      name: { type: String, required: true },
      description: { type: String, require: true },
      type: { type: String, require: true, default: 'fixed amount', enum: ['fixed amount', 'percentage'] },
      value: { type: Number, require: true },
      code: { type: String, require: true },
      start_date: { type: Date, require: true },
      end_date: { type: Date, require: true },
      max_quantity: { type: Number, require: true },
      amount_user_used: { type: Number, require: true, default: 0 },
      maximum_amount_per_user: { type: Number, require: true },
      user_used: { type: [userUsedSchema], default: [] },
      min_order_value: { type: Number, require: true },
      is_active: { type: Boolean, default: true },
      apply_to_products: { type: String, require: true, enum: ['all', 'specific'] },
      product_ids_apply: { type: [{ type: String, ref: 'Product' }], default: [], require: true },
   },
   {
      collection: '_Discount',
      timestamps: true,
   }
)

//Export the model
export const discountModel = mongoose.model<DiscountType>('Discount', discountSchema)
