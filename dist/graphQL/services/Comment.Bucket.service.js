"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCommentBucket = void 0;
const CommentBucketPattern_model_1 = require("../../models.mongo/CommentBucketPattern.model");
const mongoose_1 = __importDefault(require("mongoose"));
const insertCommentBucket = (_, { inputComent: { text, parentId, receiverId, senderId } }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CommentBucketPattern_model_1.CommentsBucket.findOneAndUpdate({
            receiverId,
            senderId,
            count: { $lt: 10 },
        }, {
            $push: {
                comments: {
                    commentId: new mongoose_1.default.Types.ObjectId(),
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
        }, {
            new: true,
            upsert: true,
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.insertCommentBucket = insertCommentBucket;
//# sourceMappingURL=Comment.Bucket.service.js.map