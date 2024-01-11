"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsBucket = void 0;
const mongoose_1 = require("mongoose");
const CommnetBucketSchema = new mongoose_1.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    page: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    comments: {
        type: Array,
        default: [
            {
                commentId: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    require: true,
                    unique: true,
                },
                parentId: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    collection: "_CommentsBucket",
    timestamps: true,
});
exports.CommentsBucket = (0, mongoose_1.model)("_CommentsBucket", CommnetBucketSchema);
//# sourceMappingURL=CommentBucketPattern.model.js.map