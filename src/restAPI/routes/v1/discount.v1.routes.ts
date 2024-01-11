import express from 'express'
const route = express.Router()
import { AuthenticationSeller } from '../../../auth/auth.utils'
import { asyncHandler } from '../../../helpers/asyncHandler'
import discountShopController from '../../controllers/discount.controller/discount.shop.controller'
//
route.use('/shop', AuthenticationSeller)
route.post('/shop/new', asyncHandler(discountShopController.createNewDiscount))
//
module.exports = route
