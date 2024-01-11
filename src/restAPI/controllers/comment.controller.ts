import { Request, Response } from 'express'
import { SUCCESS } from '../../core/success.response'
import commentService from '../service/comment.service'
import { ErrorResponse } from '../../core/error.response'

//
class CommentController {
   //
   public async createComment(req: Request, res: Response) {
      new SUCCESS({
         message: 'Create Message',
         data: await commentService.createComment(req.body),
      }).send(res)
   }
   //
   public async getCommentByParentId(req: Request, res: Response) {
      try {
         const { productId, parentId, limit, offset } = req.query as unknown as {
            productId: string
            parentId: string | null
            limit: number
            offset: number
         }
         //
         new SUCCESS({
            message: 'get',
            data: await commentService.getCommentByParentId({
               productId,
               parentId,
               limit,
               offset,
            }),
         }).send(res)
      } catch (error) {
         new ErrorResponse(error?.message, error.status).send(res)
      }
      //
   }
   //
   public async deleteCommentById(req: Request, res: Response) {
      new SUCCESS({
         message: 'OK',
         data: await commentService.deleteCommentById(req.body),
      }).send(res)
   }
   //
   public async updateCommentById(req: Request, res: Response) {
      try {
         const { comment_id, content } = req.query as unknown as {
            comment_id: string
            content: string
         }
         //
         new SUCCESS({
            message: 'get',
            data: await commentService.updateCommentById(comment_id, content),
         }).send(res)
         //
      } catch (error) {
         new ErrorResponse(error?.message, error.status).send(res)
      }
   }
}

export default new CommentController()
