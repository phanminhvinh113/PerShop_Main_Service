import express from 'express'
import { asyncHandler } from '../../../helpers/asyncHandler'
import InventoryController from '../../../restAPI/controllers/inventory.controller'
import { AuthenticationSeller } from '../../../auth/auth.utils'

//
const route = express.Router()
//USER
route.use('/', AuthenticationSeller)
route.post('/inventory', asyncHandler(InventoryController.inventory))
//
module.exports = route
