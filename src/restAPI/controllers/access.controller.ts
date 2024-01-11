import { Request, Response } from 'express'
import accessService from '../service/access.service'
import useragent from 'useragent'
import { HEADER } from '../../utils/constant'
require('dotenv').config()
//
class accessController {
   Register = async (req: Request, res: Response) => {
      try {
         const IP_Device = req.headers['x-forwarded-for'] || req.connection.remoteAddress
         const Device = useragent.parse(req.headers['user-agent']).os.toString()
         //
         return res.status(201).json(await accessService.registerService({ ...req.body, IP_Device, Device }))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   RegisterSeller = async (req: Request, res: Response) => {
      try {
         // get ip device send request
         const IP_Device = req.headers['x-forwarded-for'] || req.connection.remoteAddress
         const Device = useragent.parse(req.headers['user-agent']).os.toString()
         const userId = req.User?.userId || req.headers['x-client-id']
         //
         return res.status(201).json(await accessService.registerSellerService({ ...req.body, userId, IP_Device, Device }))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   Login = async (req: Request, res: Response) => {
      try {
         // get IP device send request
         const IP_Device: string | string[] | undefined = req.headers['x-forwarded-for'] || req.connection.remoteAddress
         const Device = useragent.parse(req.headers['user-agent']).os.toString()
         //
         const response: any = await accessService.Login({ ...req.body, IP_Device, Device })
         //save cookie to cookies browser
         await res.cookie('refreshToken', response.data?.tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            path: `http://localhost:${process.env.PORT_REST_FULL}`,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30, // 1 months
         })
         //
         return res.status(201).json(response)
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   Logout = async (req: Request, res: Response) => {
      try {
         return res.status(201).json(await accessService.LogOut(req.keyStore, req.User))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   handleRefreshToken = async (req: Request, res: Response) => {
      try {
         // const refreshToken = req.cookies['refreshToken']
         const { refreshToken } = req.body
         const userId: any = req.headers[HEADER.CLIENT_ID]
         //
         return res.status(201).json(await accessService.handleRefreshToken(refreshToken, userId))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
}
//
export default new accessController()
