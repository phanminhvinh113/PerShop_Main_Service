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
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = require("../services/User.service");
const User_model_1 = require("../../models.mongo/User.model");
const Comment_Bucket_service_1 = require("../services/Comment.Bucket.service");
const resolvers = {
    Query: {
        User: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield User_model_1.UserModel.findById(id);
        }),
        Users: () => __awaiter(void 0, void 0, void 0, function* () { return yield User_model_1.UserModel.find(); }),
    },
    Mutation: {
        createUser: (_, { inputUser: { name, email, password } }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = new User_model_1.UserModel({
                name,
                email,
                password,
            });
            yield user.save();
            return user;
        }),
        deleteUser: User_service_1.deleteUser,
        insertCommentBucket: Comment_Bucket_service_1.insertCommentBucket,
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.index.js.map