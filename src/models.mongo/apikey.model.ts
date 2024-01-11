import mongoose from 'mongoose' // Erase if already required
import { ROLES } from '../utils/constant'
import { ApiKeyModel } from '../restAPI/interface/index.interface'
// Declare the Schema of the Mongo model
var ApiKeySchema = new mongoose.Schema<ApiKeyModel>(
   {
      key: {
         type: String,
         required: true,
         unique: true,
      },
      status: {
         type: Boolean,
         default: true,
      },
      permission: {
         type: [String],
         required: true,
         enum: [ROLES.ADMIN, ROLES.USER, ROLES.SELLER],
      },
   },
   {
      collection: '_ApiKey',
      timestamps: true,
   }
)

//Export the model
export default mongoose.model<ApiKeyModel>('ApiKey', ApiKeySchema)
