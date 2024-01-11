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
const mongoose_1 = require("mongoose");
const keyToken_model_1 = __importDefault(require("../../models.mongo/keyToken.model"));
class KeyTokenService {
    constructor() {
        this.createKeyToken = ({ userId, publicKey, refreshToken, IP_Device, Device }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { user: userId };
                const update = {
                    publicKey,
                    refreshTokensUsed: [],
                    refreshToken,
                    IP_Device,
                    Device,
                };
                const tokens = yield keyToken_model_1.default.findOneAndUpdate(filter, update, {
                    upsert: true,
                    new: true,
                });
                return tokens ? tokens.publicKey : null;
            }
            catch (error) {
                return error;
            }
        });
        this.findByUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield keyToken_model_1.default.findOne({ user: new mongoose_1.Types.ObjectId(userId) }).lean();
        });
        this.removeKeyToken = (_id) => __awaiter(this, void 0, void 0, function* () {
            return yield keyToken_model_1.default.findByIdAndRemove({ _id: new mongoose_1.Types.ObjectId(_id) });
        });
    }
}
exports.default = new KeyTokenService();
//# sourceMappingURL=keyToken.service.js.map