import { NextFunction, Response, Request } from 'express'
import { findKeyById } from '../restAPI/service/apikey.service'
import { ApiKeyModel } from '../restAPI/interface/index.interface'
import { HEADER } from '../utils/constant'
//
export const ApiKey = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const key: string | undefined = req.headers[HEADER.API_KEY]?.toString()
      if (!key) {
         return res.status(403).json({
            code: -1,
            message: 'Forbidden Error!',
         })
      }
      const objKey: ApiKeyModel | null = await findKeyById(key)
      //
      if (!objKey) {
         return res.status(403).json({
            code: -1,
            message: 'Forbidden Error!',
         })
      }
      req.objKey = objKey
      //
      return next()
      //
   } catch (error) {
      console.log(error)
      return res.status(403).json({
         code: -1,
         message: 'Server Error!',
      })
   }
}
export const Permission = (permission: string): ((req: Request, res: Response, next: NextFunction) => void) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      //
      if (!req?.objKey?.permission) {
         return res.status(403).json({
            code: -1,
            message: 'Denied Access!',
         })
      }
      //
      const isValidPermission: boolean = req?.objKey.permission.includes(permission)
      //
      if (!isValidPermission) {
         return res.status(403).json({
            code: -1,
            message: 'Denied Access!',
         })
      }
      //
      if (isValidPermission) {
         return next()
      }
   }
}
