import mongoose, { Schema } from 'mongoose' // Erase if already required
//
interface KeyTokensType {
   user: object | string
   publicKey: string
   refreshTokensUsed: object
   refreshToken: object
   IP_Device: string | string[]
   Device: string
}
// Declare the Schema of the Mongo model
const KeyTokensSchema = new mongoose.Schema<KeyTokensType>(
   {
      user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      publicKey: {
         type: String,
         required: true,
         unique: true,
      },
      refreshTokensUsed: {
         type: Array,
         default: [],
      },
      refreshToken: {
         type: String,
         required: true,
      },
      IP_Device: {
         type: String,
         require: true,
      },
      Device: {
         type: String,
         required: true,
      },
   },
   {
      collection: '_KeyTokens',
      timestamps: true,
   }
)

//Export the model
const keyTokenModel = mongoose.model<KeyTokensType>('KeyTokensModel', KeyTokensSchema)
export default keyTokenModel
