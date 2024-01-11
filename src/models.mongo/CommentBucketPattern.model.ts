import { Schema, model } from "mongoose";

type Comments = {
  commentId: string;
  text: string;
  date: number | string;
};
type Replies = {
  text: string;
  commentId: string;
  parentId: string;
};
interface Bucket {
  senderId: string;
  receiverId: string;
  page: number | string;
  count: number;
  comments: Comments[] | undefined;
  replies: Replies[] | undefined;
}

const CommnetBucketSchema = new Schema<Bucket>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    page: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    comments: {
      type: Array,
      default: [
        {
          commentId: {
            type: Schema.Types.ObjectId,
            require: true,
            unique: true,
          },
          parentId: {},
          text: { type: String, require: true },
          date: {
            type: Date,
            default: Date.now,
            required: true,
          },
        },
      ],
    },
    replies: {
      type: Array,
      default: [
        {
          commentId: {
            type: Schema.Types.ObjectId,
            require: true,
            unique: true,
          },
          parentId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          text: { type: String, require: true },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  {
    collection: "_CommentsBucket",
    timestamps: true,
  }
);
export const CommentsBucket = model<Bucket>(
  "_CommentsBucket",
  CommnetBucketSchema
);
