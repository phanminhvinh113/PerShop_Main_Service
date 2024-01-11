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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = require("../../models.mongo/User.model");
const constant_1 = require("../../utils/constant");
const keyToken_service_1 = __importDefault(require("./keyToken.service"));
const auth_ultils_1 = require("../../auth/auth.ultils");
const morgan_1 = require("morgan");
const index_utils_1 = require("../../utils/index.utils");
const error_response_1 = require("../../core/error.response");
const user_service_1 = require("./user.service");
class accessService {
    constructor() {
        this.registerService = ({ email, password, name, IP_Device, Device }) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password || !name)
                    throw new Error('Missing Parameter');
                if (yield (0, user_service_1.checkExistUser)(email)) {
                    throw new error_response_1.BadRequestError('Error:Email already!');
                }
                const hashPassword = bcrypt_1.default.hashSync(password, 10);
                const new_user = yield User_model_1.UserModel.create({
                    name,
                    email,
                    password: hashPassword,
                    status: constant_1.STATE_USER.ACTIVE,
                    roles: [constant_1.ROLES.USER],
                });
                if (!new_user)
                    throw new Error('Failed!');
                const { privateKey, publicKey } = yield (0, user_service_1.generateKeyPair)();
                const publicKeyString = yield keyToken_service_1.default.createKeyToken({
                    userId: new_user._id,
                    publicKey,
                    IP_Device,
                    Device,
                });
                if (!publicKeyString)
                    throw new Error('PublicKey Error!');
                const tokens = yield (0, auth_ultils_1.createTokenPair)({ userId: new_user._id, roles: new_user.roles }, publicKey, privateKey);
                if (tokens) {
                    return resolve({
                        code: 0,
                        status: 201,
                        message: 'OK!',
                        data: {
                            user: (0, index_utils_1.getInfoData)(['name', 'roles', 'email', 'verify', 'status'], new_user),
                        },
                    });
                }
                if (!morgan_1.token) {
                    return resolve({
                        code: 0,
                        status: 200,
                        message: 'Failed!',
                        data: null,
                    });
                }
            }
            catch (error) {
                console.log(error);
                return reject(error);
            }
        }));
        this.Login = ({ _userName, password, IP_Device, Device }) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!_userName || !password)
                        throw new error_response_1.BadRequestError('Missing Parameter!', 400);
                    const _user = yield (0, user_service_1.findUserByUserName)(_userName, constant_1.FindUserByField.EMAIL);
                    if (!_user)
                        throw new error_response_1.BadRequestError('User Name Not Exist!', 406);
                    const matchPasword = bcrypt_1.default.compareSync(password, _user.password);
                    if (!matchPasword)
                        throw new error_response_1.AuthFailedError('Incorrect Password:X_01');
                    const tracking = yield (0, user_service_1.TrackingDevice)(_user._id, IP_Device, Device);
                    const { privateKey, publicKey } = yield (0, user_service_1.generateKeyPair)();
                    const tokens = yield (0, auth_ultils_1.createTokenPair)({ userId: _user._id, email: _user.email, name: _user.name }, publicKey, privateKey);
                    if (!tokens)
                        throw new error_response_1.ConflictRequestError('Failed Loggin!');
                    if (tokens) {
                        yield keyToken_service_1.default.createKeyToken({
                            userId: _user._id,
                            publicKey,
                            refreshToken: tokens.refreshToken,
                            IP_Device,
                            Device,
                        });
                        resolve({
                            code: constant_1.StatusCode.SUCCESS,
                            message: constant_1.ReasonStatusCode.SUCCESS,
                            data: {
                                _user: (0, index_utils_1.getInfoData)(['_id', 'name', 'roles', 'email', 'verify', 'status'], _user),
                                tokens,
                            },
                            tracking,
                        });
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.LogOut = (keyStore, UserInfo) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!keyStore || !UserInfo)
                    throw new error_response_1.BadRequestError('Invalid Parameter');
                const checkUserAndDelKey = [(0, user_service_1.findUserByInfo)(UserInfo), keyToken_service_1.default.removeKeyToken(keyStore._id)];
                const [result, delkeyResult] = yield Promise.all(checkUserAndDelKey);
                if (!result)
                    throw new error_response_1.AuthFailedError('Invalid User(DB)!');
                return resolve({
                    code: 0,
                    status: constant_1.StatusCode.SUCCESS,
                    message: 'Log Out Sucess!',
                    data: {
                        acknowledge: delkeyResult ? true : false,
                        deletedCount: 1,
                    },
                });
            }
            catch (error) {
                return reject(error);
            }
        }));
    }
}
exports.default = new accessService();
//# sourceMappingURL=access.service.js.map