import commentModel from '../../models.mongo/comment.model'
import { BadRequestError, NotFoundError } from '../../core/error.response'
import { StatusCode } from '../../utils/constant'
import { convertToObjectId, getSelectData } from '../../utils/index.utils'
//
export interface CommentType {
   product_id: string
   user_id: string
   content: string
   parentCommentId: string | null
}
//
class CommentService {
   public async createComment({ product_id, user_id, content, parentCommentId = null }: CommentType) {
      if (!user_id || !user_id || !content) throw new BadRequestError()
      //
      const newComment = new commentModel({
         product_id,
         user_id,
         content,
         parent_id: parentCommentId,
      })
      //
      let rightValue: number
      // IF Main Comment
      if (parentCommentId === null) {
         rightValue = 1
      } else {
         //IF Reply Comment
         // Find Max Right Value In Tree
         const parentComment = await commentModel.findOne({ product_id: convertToObjectId(parentCommentId) }).lean()
         if (!parentComment) throw new NotFoundError()
         //
         rightValue = parentComment.comment_right

         //Update Many Parent Node
         await commentModel.updateMany(
            {
               product_id: convertToObjectId(product_id),
               comment_right: { $gt: rightValue },
            },
            {
               $inc: { comment_right: 2 },
            }
         )
         await commentModel.updateMany(
            {
               product_id: convertToObjectId(product_id),
               comment_left: { $gt: rightValue },
            },
            {
               $inc: { comment_left: 2 },
            }
         )
      }
      //
      newComment.comment_left = rightValue
      newComment.comment_left = rightValue + 1
      //
      await newComment.save()
      //
      return {
         code: 0,
         status: StatusCode.SUCCESS,
         comment: newComment,
      }
      //
   }
   //
   public async getCommentByParentId({
      productId,
      parentId = null,
      limit = 50,
      offset = 0,
   }: {
      productId: string
      parentId: string | null
      limit: number
      offset: number
   }) {
      if (!productId) throw new BadRequestError('Missing Param! ')
      let comments
      //
      if (parentId === null) {
         comments = await commentModel
            .findById({
               product_id: convertToObjectId(productId),
            })
            .limit(limit)
            .skip(offset)
         if (!comments) throw new NotFoundError('Not Found  Comment')
      }

      //
      const parent = await commentModel.findById(parentId).lean()
      if (!parent) throw new NotFoundError('Not Found Parent Comment')
      //
      comments = commentModel
         .find({
            product_id: convertToObjectId(productId),
            comment_left: { $gt: parent.comment_left },
            comment_right: { $lt: parent.comment_right },
         })
         .limit(limit)
         .skip(offset)
         .select(getSelectData(['_id', 'content', 'parent_id']))
         .lean()
      //
      return {
         code: 0,
         statusCode: StatusCode.SUCCESS,
         comments,
      }
   }
   //
   public async deleteCommentById({ comment_id, product_id }: { comment_id: string; product_id: string }) {
      if (!comment_id) throw new BadRequestError('Missing Param!')
      //
      const comment = await commentModel.findByIdAndDelete(convertToObjectId(comment_id))
      //
      if (!comment) throw new NotFoundError('Not Found!')
      //
      //FIND LENGTH OF NODE TO DELETE
      const withNode: number = comment.comment_right - comment.comment_left + 1

      // Delete Comment and Children Comment
      await commentModel.deleteMany({
         product_id: convertToObjectId(product_id),
         comment_right: { $lt: comment.comment_right },
         comment_left: { $gt: comment.comment_left },
      })
      //Update For Each Node Has Comment Right More Than Right_Node_Comment by subtract "withNode"
      await commentModel.updateMany(
         {
            product_id: convertToObjectId(product_id),
            comment_right: { $gt: comment.comment_right },
         },
         {
            $inc: { comment_right: -withNode },
         }
      )
      //Update For Each Node Has Comment Left More Than Left_Node_Comment by subtract "withNode"
      await commentModel.updateMany(
         {
            product_id: convertToObjectId(product_id),
            comment_left: { $gt: comment.comment_left },
         },
         {
            $inc: { comment_left: -withNode },
         }
      )
      return comment
   }
   //
   public async updateCommentById(comment_id: string, newContent: string) {
      if (!comment_id || !newContent) throw new BadRequestError()
      //
      const comments = await commentModel.findByIdAndUpdate(convertToObjectId(comment_id), { ['content']: newContent }, { new: true }).lean()
      //
      if (!comments) throw new NotFoundError('Not Found!')
      //
      return comments
   }
}

export default new CommentService()
