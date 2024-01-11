export interface DeviceUser {
   IP_Device: string
   Device: string
}
export interface User extends DeviceUser {
   _id?: string
   userId?: string
   email: string
   password: string
   name: string
   roles?: string[]
}
export interface UserDecodeJWT {
   userId: string
   email: string
   name: string
   roles?: string[]
   privateKey: string
}
export interface UserKeyModel extends DeviceUser {
   _id: string
   refreshToken: string
   refreshTokensUsed: string[]
   publicKey: string
   user: string | object
}
export interface UserLogin extends DeviceUser {
   _id?: string
   _userName?: string
   email?: string
   phone?: number | string
   password: string
   name?: string
   _refreshToken?: string
   roles: string[]
}
// export interface UserLogOut {
//    keyStore: UserKeyModel | undefined | null
//    User: User | undefined | null
// }
export interface ResponseType {
   code: number | string
   status: number
   message: string | undefined
   data?: object | undefined
}

export interface ApiKeyModel {
   key: string | null
   status: boolean
   permission: string[]
}
//
