import { Request, Response } from 'express'
import CheckoutService from '../service/checkout.service'

class CheckoutController {
   public checkoutReview = async (req: Request, res: Response) => {
      try {
         const payload: any = req.body
         const userId = req.User?.userId
         return res.status(201).json(await CheckoutService.CheckoutReview({ ...payload, userId }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   public orderProductByUser = async (req: Request, res: Response) => {
      try {
         const payload: any = req.body
         const userId = req.User?.userId
         return res.status(201).json(await CheckoutService.OrderByUser({ ...payload, userId }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   public getAllOrderByUser = async (req: Request, res: Response) => {
      try {
         const userId: any = req.User?.userId
         return res.status(201).json(await CheckoutService.getOrderByUser(userId))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   public getOneOrderByUser = async (req: Request, res: Response) => {
      try {
         const orderId: any = req.body.orderId
         const userId: any = req.User?.userId
         return res.status(201).json(await CheckoutService.getOneOrderByUser(userId, orderId))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   public cancelOrderByUser = async (req: Request, res: Response) => {
      try {
         const orderId: any = req.body.orderId
         const userId: any = req.User?.userId
         return res.status(201).json(await CheckoutService.cancelOrderByUser(userId, orderId))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   public updateStatusOrderByShop = async (req: Request, res: Response) => {
      try {
         const orderId: any = req.body.orderId
         const userId: any = req.User?.userId
         return res.status(201).json(await CheckoutService.updateOrderStatusByShop(userId, orderId))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
}
export default new CheckoutController()
