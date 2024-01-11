import { Types } from 'mongoose'
import { unGetSelectData } from '../../utils/index.utils'
import orderModel from '../order.model'

export const getAllOrderByUser = async (userId: string) => {
   return await orderModel
      .find({
         order_userId: new Types.ObjectId(userId),
         order_status: { $in: ['pending', 'shipped'] },
      })
      .select(unGetSelectData(['__V', '_id']))
      .lean()
}
// GET ONE ORDER BY USER
export const getOneOrderByUser = async (userId: string, orderId: string) => {
   return await orderModel
      .findOne({
         _id: new Types.ObjectId(orderId),
         order_userId: new Types.ObjectId(userId),
         order_status: { $in: ['pending', 'shipped'] },
      })
      .select(unGetSelectData(['__V', '_id']))
      .lean()
}
// UPDATE STATUS ORDER BY SHOP
export const updateStatusOrder = async ({ orderId, statusBefore, statusAfter }: { orderId: string; statusBefore: string; statusAfter: string }) => {
   return await orderModel.findOneAndUpdate(
      {
         _id: new Types.ObjectId(orderId),
         order_status: statusBefore,
      },
      {
         $set: { order_status: statusAfter },
      }
   )
}
