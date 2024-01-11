import { StatusCode } from '../../utils/constant'
import { ConflictRequestError } from '../../core/error.response'
import { inventoryModel } from '../inventory.model'
import { Types } from 'mongoose'

export const insertInvProduct = async ({
   productId,
   shopId,
   location,
   stock,
}: {
   productId: string | object
   shopId: string | object
   location: string
   stock: number
}) => {
   const inventory = await inventoryModel.create({
      inv_productId: productId,
      inv_shopId: shopId,
      inv_location: location ? location : 'unknown',
      inv_stock: stock,
   })
   if (!inventory) throw new ConflictRequestError('Wrong Server!')
   return {
      code: 0,
      status: StatusCode.SUCCESS,
      message: 'OK',
      data: inventory,
   }
}

export const reservationInventory = async ({
   productId,
   quantity,
   cartId,
}: {
   productId: string | Types.ObjectId
   quantity: number
   cartId: string
}) => {
   const addToInventory = await inventoryModel.updateOne(
      {
         inv_productId: new Types.ObjectId(productId),
         inv_stock: { $gte: +quantity },
         'inv_reservation.cartId': new Types.ObjectId(cartId),
      },
      {
         $inc: {
            inv_stock: -quantity,
            'inv_reservation.$.quantity': quantity,
         },
      },
      {
         new: true,
      }
   )
   if (addToInventory.modifiedCount && addToInventory.acknowledged) return addToInventory
   return await inventoryModel.updateOne(
      {
         inv_productId: new Types.ObjectId(productId),
         inv_stock: { $gte: +quantity },
      },
      {
         $push: { inv_reservation: { cartId, quantity } },
         $inc: {
            inv_stock: -quantity,
         },
      },
      {
         new: true,
         upsert: true,
      }
   )
}
