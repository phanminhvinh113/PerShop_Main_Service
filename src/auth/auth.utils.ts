import { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import { asyncHandler } from '../helpers/asyncHandler'
import { AuthFailedError, NotFoundError } from '../core/error.response'
import { HEADER, ROLES } from '../utils/constant'
import keyTokenService from '../restAPI/service/keyToken.service'

export const createTokenPair = async (payload: object, _publicKey: string, privateKey: string) => {
   try {
      // access token
      const accessToken = JWT.sign(payload, privateKey, {
         algorithm: 'RS256',
         expiresIn: '1 days',
      })
      //refresh token
      const refreshToken = JWT.sign({ ...payload, privateKey }, privateKey, {
         algorithm: 'RS256',
         expiresIn: '30 days',
      })
      //
      return accessToken && refreshToken ? { accessToken, refreshToken } : { accessToken: null, refreshToken: null }
      //
   } catch (error) {
      return Error('Error Generate Token')
   }
}

export const VerifyToken = async (token: string, publicKey: string) => {
   try {
      const decode = await JWT.verify(token, publicKey, {
         algorithms: ['RS256'],
         maxAge: '1 days',
      })
      return decode
   } catch (error) {
      return error
   }
}
// AUTH FOR USER
export const Authentication = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
   //1 Find User IN System
   const userId: any = req.headers[HEADER.CLIENT_ID]
   if (!userId) throw new AuthFailedError('Invalid Request')
   //2 Check Token User Exist in DB
   const keyStore: any = await keyTokenService.findByUserId(userId)
   if (!keyStore) throw new NotFoundError('Invalid Key Store!')
   //3 Check Access Token
   const accessToken = req.headers[HEADER.AUTHORIZATION]
   if (!accessToken) throw new AuthFailedError('Invalid Request(MS TOKEN)')
   //4 Decode And Verify User
   try {
      const decodeJWT = await VerifyToken(accessToken, keyStore.publicKey)
      // Check Permission User
      if (decodeJWT.userId === userId) {
         //
         req.keyStore = keyStore
         req.User = decodeJWT
         //
         return next()
      } else throw new AuthFailedError(decodeJWT.message || 'Unauthorized User')
      //
   } catch (error) {
      throw error
   }
   //
})
// AUTH FOR SELLER OR SHOP
export const AuthenticationSeller = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
   //1
   const userId: any = req.headers[HEADER.CLIENT_ID]
   if (!userId) throw new AuthFailedError('Invalid Request')
   //2
   const keyStore: any = await keyTokenService.findByUserId(userId)
   if (!keyStore) throw new NotFoundError('Invalid Key Store!')
   //3
   const accessToken = req.headers[HEADER.AUTHORIZATION]
   if (!accessToken) throw new AuthFailedError('Invalid Request(MS TOKEN)')
   //4
   try {
      const decodeJWT = await VerifyToken(accessToken, keyStore.publicKey)
      // Pass If User's Permission Seller
      if (decodeJWT.userId === userId && decodeJWT.roles?.includes(ROLES.SELLER)) {
         //
         req.keyStore = keyStore
         req.User = decodeJWT
         //
         return next()
      } else throw new AuthFailedError(decodeJWT.message || 'Unauthorized Seller')
      //
   } catch (error) {
      throw error
   }
   //
})
// AUTH FOR ADMIN
export const AuthenticationAdmin = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
   //1
   const userId: any = req.headers[HEADER.CLIENT_ID]
   if (!userId) throw new AuthFailedError('Invalid Request')
   //2
   const keyStore: any = await keyTokenService.findByUserId(userId)
   if (!keyStore) throw new NotFoundError('Invalid Key Store!')
   //3
   const accessToken = req.headers[HEADER.AUTHORIZATION]
   if (!accessToken) throw new AuthFailedError('Invalid Request(MS TOKEN)')
   //4
   try {
      const decodeJWT = await VerifyToken(accessToken, keyStore.publicKey)
      if (decodeJWT.userId === userId && decodeJWT.roles?.includes(ROLES.ADMIN)) {
         //
         req.keyStore = keyStore
         req.User = decodeJWT
         //
         return next()
      } else throw new AuthFailedError(decodeJWT.message || 'Unauthorized Admin')
      //
   } catch (error) {
      throw error
   }
   //
})
