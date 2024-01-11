import { Request, Response } from 'express'
import InventoryService from '../service/inventory.service'

class InventoryController {
   public inventory = async (req: Request, res: Response) => {
      try {
         const payload = { ...req.body, userId: req.User?.userId }
         return res.status(201).json(await InventoryService.addStockToInventory(payload))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
}
export default new InventoryController()
