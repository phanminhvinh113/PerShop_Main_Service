import { CommentsBucket } from "../../models.mongo/CommentBucketPattern.model";
import mongoose from "mongoose";
export const insertCommentBucket = async (
  _: any,
  { inputComent: { text, parentId, receiverId, senderId } }: any
) => {
  try {
    return await CommentsBucket.findOneAndUpdate(
      {
        receiverId,
        senderId,
        count: { $lt: 10 },
      },
      {
        $push: {
          comments: {
            commentId: new mongoose.Types.ObjectId(),
            text,
            date: new Date().toLocaleDateString(),
            parentId: parentId ? parentId : "0",
          },
        },
        $inc: { count: 1 },
        $setOnInsert: {
          senderId,
          receiverId,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
