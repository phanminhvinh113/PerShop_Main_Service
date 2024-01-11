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
exports.deleteUser = void 0;
const User_model_1 = require("../../models.mongo/User.model");
const deleteUser = (_, { _id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_model_1.UserModel.findByIdAndDelete({ _id });
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=User.service.js.map