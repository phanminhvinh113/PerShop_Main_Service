import { inventoryModel } from '../../models.mongo/inventory.model'
import { BadRequestError, ConflictRequestError } from '../../core/error.response'
import { findProductById } from '../../models.mongo/repositories/product.repo'
import { StatusCode } from '../../utils/constant'

interface InventoryServiceType {
   stock: number
   productId: string
   shopId: string
   location: string
}
class InventoryService {
   public async addStockToInventory({ stock, productId, shopId, location = 'vn' }: InventoryServiceType) {
      const product = await findProductById(productId, [])
      if (!product) throw new BadRequestError('Not Found Product!')
      //
      const updateInventory = await inventoryModel.findOneAndUpdate(
         {
            inv_productId: productId,
            inv_shopId: shopId,
         },
         {
            $inc: {
               inv_stock: -stock,
            },
            $set: {
               inv_location: location,
            },
         }
      )
      if (!updateInventory) throw new ConflictRequestError('Update Failed!')
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         data: updateInventory,
      }
   }
}
export default new InventoryService()
