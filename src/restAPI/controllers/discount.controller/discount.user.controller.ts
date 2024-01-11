import { Request, Response } from 'express'
import discountUserService from '../../service/discount.service/discount.user.service'
class DiscountShopController {
   createNewDiscount = async (req: Request, res: Response) => {
      try {
         const payload: any = req.body
         return res.status(201).json(await discountUserService.cancelDiscountCode(payload))
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
export default new DiscountShopController()
