import express from 'express'
import { asyncHandler } from '../../../helpers/asyncHandler'
import uploadController from '../../../restAPI/controllers/upload.controller'

//
const route = express.Router()

route.get('/get/image/cloudfront', asyncHandler(uploadController.getImageSign))

module.exports = route
