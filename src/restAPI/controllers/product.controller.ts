import { Request, Response } from 'express'
import productService from '../service/product.service'

require('dotenv').config()
//
class ProductController {
   createProduct = async (req: Request, res: Response) => {
      try {
         //
         const payload = { ...req.body, shop_id: req.User?.userId }
         const type: string = req.body?.type
         //
         return res.status(201).json(await productService.createProduct(type, payload))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status || 403,
            message: error?.message,
         })
      }
   }
   //
   /**
    * @description get all daft for shop
    * @param req
    * @param res
    * @returns
    */
   getAllDaftForShop = async (req: Request, res: Response) => {
      try {
         //
         const shop_id: string | undefined = req.User?.userId
         const skip: any = req.query?.skip || 0
         const limit: any = req.query?.limit || 60
         //
         return res.status(201).json(await productService.findAllDaftForShop({ shop_id, skip, limit }))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status || 403,
            message: error?.message,
         })
      }
   }
   //
   getAllPublicForShop = async (req: Request, res: Response) => {
      try {
         //
         const shop_id: string | undefined = req.User?.userId
         const skip: any = req.query?.skip || 0
         const limit: any = req.query?.limit || 60
         //
         return res.status(201).json(await productService.findAllPublicForShop({ shop_id, skip, limit }))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status || 403,
            message: error?.message,
         })
      }
   }
   //
   publicProductByShop = async (req: Request, res: Response) => {
      try {
         //
         const shop_id: any = req.User?.userId
         const product_id: any = req.body.product_id
         return res.status(201).json(await productService.publicProductByShop(shop_id, product_id))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status || 403,
            message: error?.message,
         })
      }
   }
   //
   findAllProducts = async (req: Request, res: Response) => {
      try {
         return res.status(201).json(await productService.findAllProduct(req.query))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status || 403,
            message: error?.message,
         })
      }
   }
   //
   searchProduct = async (req: Request, res: Response) => {
      try {
         const keySearch: any = req.query.q || ''
         return res.status(201).json(await productService.searchProduct(keySearch))
         //
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status || 403,
            message: error?.message,
         })
      }
   }
}
export default new ProductController()
