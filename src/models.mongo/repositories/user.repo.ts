import { UserModel } from '../user.model'

export const findUserById = async (userId: string) => {
   return await UserModel.findById(userId).lean()
}
