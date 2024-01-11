import { Types } from 'mongoose'
import keyTokenModel from '../../models.mongo/keyToken.model'
//
interface createKeyTokenType {
   userId: string | object | undefined
   publicKey: string
   refreshToken?: string
   IP_Device: string | string[]
   Device: string
}
class KeyTokenService {
   createKeyToken = async ({ userId, publicKey, refreshToken, IP_Device, Device }: createKeyTokenType) => {
      try {
         const filter = { user: userId }
         const update = {
            publicKey,
            refreshTokensUsed: [],
            refreshToken,
            IP_Device,
            Device,
         }
         const tokens = await keyTokenModel.findOneAndUpdate(filter, update, {
            upsert: true,
            new: true,
         })
         return tokens ? tokens.publicKey : null
      } catch (error) {
         return error
      }
   }
   findByUserId = async (userId: string) => {
      return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
   }
   removeKeyToken = async (_id: string) => {
      return await keyTokenModel.findOneAndDelete({ user: new Types.ObjectId(_id) })
   }
   //
   findByRefreshTokenUsed = async (refreshToken: string, _userId: string) => {
      return await keyTokenModel.findOne({ user: _userId, refreshTokensUsed: refreshToken }).lean()
   }
   findByRefreshToken = async (refreshToken: string, _userId: string) => {
      return await keyTokenModel.findOne({ user: _userId, refreshToken })
   }
}
export default new KeyTokenService()
