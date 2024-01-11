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
exports.TrackingDevice = exports.findUserByInfo = exports.findUserByUserName = exports.generateKeyPair = exports.checkExistUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const User_model_1 = require("../../models.mongo/User.model");
const constant_1 = require("../../utils/constant");
const keyToken_model_1 = __importDefault(require("../../models.mongo/keyToken.model"));
const checkExistUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findOne({
        email,
    }).lean();
    return user ? true : false;
});
exports.checkExistUser = checkExistUser;
const generateKeyPair = () => __awaiter(void 0, void 0, void 0, function* () {
    const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });
    return { publicKey, privateKey };
});
exports.generateKeyPair = generateKeyPair;
const findUserByUserName = (_userName, field) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findOne({
        [field]: _userName,
    }).lean();
    return user;
});
exports.findUserByUserName = findUserByUserName;
const findUserByInfo = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userInfo);
    if (!userInfo)
        return null;
    return yield User_model_1.UserModel.findOne({ _id: userInfo.userId, email: userInfo.email }).lean();
});
exports.findUserByInfo = findUserByInfo;
const TrackingDevice = (userId, IP_Device, Device) => __awaiter(void 0, void 0, void 0, function* () {
    const _user = yield keyToken_model_1.default.findOne({ user: userId }).lean();
    return {
        Ip_Device: (_user === null || _user === void 0 ? void 0 : _user.IP_Device) === IP_Device ? constant_1.Track_Device.IP_OLD : constant_1.Track_Device.IP_NEW,
        Deivce: (_user === null || _user === void 0 ? void 0 : _user.Device) === Device ? constant_1.Track_Device.DEVICE_OLD : constant_1.Track_Device.DEVICE_NEW,
        Device_name: Device,
    };
});
exports.TrackingDevice = TrackingDevice;
//# sourceMappingURL=user.service.js.map