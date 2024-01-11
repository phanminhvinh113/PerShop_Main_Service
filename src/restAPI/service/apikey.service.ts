import apiKeyModel from '../../models.mongo/apikey.model'
import { ApiKeyModel } from '../interface/index.interface'

//
export const findKeyById = async (key: string) => {
   // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), status: true, permission: [ROLES.ADMIN, ROLES.USER] })

   const objKey: ApiKeyModel | null = await apiKeyModel.findOne({ key, status: true }).lean()
   //
   return objKey
}
