import express from 'express'
import { asyncHandler } from '../../../helpers/asyncHandler'
import checkoutController from '../../controllers/checkout.controller'
import { Authentication, AuthenticationSeller } from '../../../auth/auth.utils'

//
const route = express.Router()
//USER
route.use('/', Authentication)
route.post('/review', asyncHandler(checkoutController.checkoutReview))
route.post('/order', asyncHandler(checkoutController.orderProductByUser))
route.get('/get/order/one', asyncHandler(checkoutController.getOneOrderByUser))
route.get('/get/order', asyncHandler(checkoutController.getAllOrderByUser))
route.post('/order/update/cancel', asyncHandler(checkoutController.cancelOrderByUser))
// SHOP
route.use('/shop', AuthenticationSeller)
route.use('/shop/update/status', asyncHandler(checkoutController.updateStatusOrderByShop))
//
module.exports = route
