import express from 'express'
import { asyncHandler } from '../../../helpers/asyncHandler'
import commentController from '../../../restAPI/controllers/comment.controller'
import { Authentication } from '../../../auth/auth.utils'

//
const route = express.Router()
//
route.use('/', Authentication)

route.post('/add', asyncHandler(commentController.createComment))

route.post('/delete', asyncHandler(commentController.deleteCommentById))

route.get('/get', asyncHandler(commentController.getCommentByParentId))
//
module.exports = route
