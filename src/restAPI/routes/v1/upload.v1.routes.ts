import express from 'express'
import { asyncHandler } from '../../../helpers/asyncHandler'
import uploadController from '../../../restAPI/controllers/upload.controller'
import multerConfig from '../../../configs/multer.config'

//
const route = express.Router()

//PUBLIC

route.post('/product/theme_url', asyncHandler(uploadController.uploadByUrl))
route.post('/product/file', multerConfig.single('file'), asyncHandler(uploadController.uploadFile))
route.post('/product/image', multerConfig.single('file'), asyncHandler(uploadController.uploadImage))
route.post('/product/s3', multerConfig.single('file'), asyncHandler(uploadController.uploadS3Image))

module.exports = route
