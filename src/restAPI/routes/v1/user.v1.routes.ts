import express from 'express'
const route = express.Router()
import accessController from '../../controllers/access.controller'
import { asyncHandler } from '../../../helpers/asyncHandler'
import { Authentication } from '../../../auth/auth.utils'
//
route.post('/register', asyncHandler(accessController.Register))
route.post('/login', asyncHandler(accessController.Login))
route.post('/refresh_token', asyncHandler(accessController.handleRefreshToken))
//ROUTE NEED VERIFY
route.use('/', Authentication)
route.post('/register/seller', asyncHandler(accessController.RegisterSeller))
route.post('/logout', asyncHandler(accessController.Logout))
//
module.exports = route
