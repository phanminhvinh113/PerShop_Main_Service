import { Request, Response } from 'express'
import cartService from '../service/cart.service'
import { CartProductType } from '../../models.mongo/interface.model'

class CartController {
   addToCart = async (req: Request, res: Response) => {
      try {
         const userId: string = req.User?.userId || ''
         const product: CartProductType = req.body.product
         return res.status(201).json(await cartService.addToCart({ userId, product }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   updateProductQuantity = async (req: Request, res: Response) => {
      try {
         const userId: string = req.User?.userId || ''
         const productId: string = req.body.productId
         const type: string = req.body.type
         return res.status(201).json(await cartService.updateProductQuantity({ userId, productId, type }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   deleteCartItemById = async (req: Request, res: Response) => {
      try {
         const userId: string = req.User?.userId || ''
         const list_product_id: string[] = req.body.list_product_id
         return res.status(201).json(await cartService.deleteCartItemById({ userId, list_product_id }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   deleteItemAllCart = async (req: Request, res: Response) => {
      try {
         const userId: string = req.User?.userId || ''
         return res.status(201).json(await cartService.deleteItemAllCart({ userId }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   getListCartItem = async (req: Request, res: Response) => {
      try {
         const userId: string = req.User?.userId || ''
         return res.status(201).json(await cartService.getListCartItem({ userId }))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
}

export default new CartController()
