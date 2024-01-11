import { Schema, model } from 'mongoose'
import { STATE_USER } from '../utils/constant'
//
interface User {
   name: string
   email: string
   password: string
   status: string
   verify: boolean
   roles: object
}
//
const UserSchema = new Schema<User>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      status: {
         type: String,
         enum: [STATE_USER.ACTIVE, STATE_USER.UN_ACTIVE],
         default: STATE_USER.UN_ACTIVE,
      },
      verify: {
         type: Schema.Types.Boolean,
         default: false,
      },
      roles: {
         type: Array,
         default: [],
      },
   },
   {
      collection: '_User',
      timestamps: true,
   }
)

//
export const UserModel = model<User>('User', UserSchema)
