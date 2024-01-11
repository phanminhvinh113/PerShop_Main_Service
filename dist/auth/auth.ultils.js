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
exports.Authentication = exports.VerifyToken = exports.createTokenPair = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../helpers/asyncHandler");
const error_response_1 = require("../core/error.response");
const constant_1 = require("../utils/constant");
const keyToken_service_1 = __importDefault(require("../restAPI/service/keyToken.service"));
const createTokenPair = (payload, _publicKey, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = jsonwebtoken_1.default.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1 days',
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '30 days',
        });
        return accessToken && refreshToken ? { accessToken, refreshToken } : { accessToken: null, refreshToken: null };
    }
    catch (error) {
        return Error('Error Genarate Token');
    }
});
exports.createTokenPair = createTokenPair;
const VerifyToken = (token, publicKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = yield jsonwebtoken_1.default.verify(token, publicKey, {
            algorithms: ['RS256'],
            maxAge: '1 days',
        });
        return decode;
    }
    catch (error) {
        return error;
    }
});
exports.VerifyToken = VerifyToken;
exports.Authentication = (0, asyncHandler_1.asyncHandler)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers[constant_1.HEADER.CLIENT_ID];
    if (!userId)
        throw new error_response_1.AuthFailedError('Invalid Request');
    const keyStore = yield keyToken_service_1.default.findByUserId(userId);
    if (!keyStore)
        throw new error_response_1.NotFoundError('Invalid Key Store!');
    const accessToken = req.headers[constant_1.HEADER.AUTHORIZATION];
    if (!accessToken)
        throw new error_response_1.AuthFailedError('Invalid Request');
    try {
        const decodeJWT = yield (0, exports.VerifyToken)(accessToken, keyStore.publicKey);
        if (decodeJWT.userId === userId) {
            req.keyStore = keyStore;
            req.User = decodeJWT;
            return next();
        }
        else
            throw new error_response_1.AuthFailedError(decodeJWT.message || 'Unauthorized User');
    }
    catch (error) {
        throw error;
    }
}));
//# sourceMappingURL=auth.ultils.js.map