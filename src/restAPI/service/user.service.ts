import crypto from 'crypto'
import { UserModel } from '../../models.mongo/user.model'
import { User, UserLogin } from '../interface/index.interface'
import { Track_Device } from '../../utils/constant'
import keyTokenModel from '../../models.mongo/keyToken.model'
import { Types } from 'mongoose'
//import { Types } from 'mongoose'

export const checkExistUser = async (email: string) => {
   const user = await UserModel.findOne({
      email,
   }).lean()
   return user ? true : false
}
//
export const generateKeyPair = async () => {
   const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096, // the length of the key in bits
      publicKeyEncoding: {
         type: 'spki', // recommended to be 'spki' by the Node.js docs
         format: 'pem', // also recommended to be 'pem'
      },
      privateKeyEncoding: {
         type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
         format: 'pem', // also recommended to be 'pem'
      },
   })
   return { publicKey, privateKey }
}
export const findUserByUserName = async (_userName: string, field: string) => {
   const user: UserLogin | null = await UserModel.findOne({
      [field]: _userName,
   }).lean()
   return user
}
//
export const findUserByInfo = async (userInfo: User | object | undefined) => {
   console.log(userInfo)
   if (!userInfo) return null
   return await UserModel.findOne(userInfo).lean()
}
//
export const TrackingDevice = async (userId: string | undefined, IP_Device: string, Device: string) => {
   const _user: User | null = await keyTokenModel.findOne({ user: userId }).lean()
   return {
      Ip_Device: _user?.IP_Device === IP_Device ? Track_Device.IP_OLD : Track_Device.IP_NEW,
      Device: _user?.Device === Device ? Track_Device.DEVICE_OLD : Track_Device.DEVICE_NEW,
      Device_name: Device,
   }
}
export const findUserByRole = async (userId: string, role: string) => {
   return await UserModel.findOne({
      _id: new Types.ObjectId(userId),
      roles: { $in: [role] },
   }).lean()
}
