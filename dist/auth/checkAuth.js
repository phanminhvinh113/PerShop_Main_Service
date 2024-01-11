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
exports.Permission = exports.ApiKey = void 0;
const apikey_service_1 = require("../restAPI/service/apikey.service");
const constant_1 = require("../utils/constant");
const ApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const key = (_a = req.headers[constant_1.HEADER.API_KEY]) === null || _a === void 0 ? void 0 : _a.toString();
        if (!key) {
            return res.status(403).json({
                code: -1,
                message: 'Forbidden Error!',
            });
        }
        const objKey = yield (0, apikey_service_1.findKeyById)(key);
        if (!objKey) {
            return res.status(403).json({
                code: -1,
                message: 'Forbidden Error!',
            });
        }
        req.objKey = objKey;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            code: -1,
            message: 'Server Error!',
        });
    }
});
exports.ApiKey = ApiKey;
const Permission = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!((_a = req === null || req === void 0 ? void 0 : req.objKey) === null || _a === void 0 ? void 0 : _a.permission)) {
            return res.status(403).json({
                code: -1,
                message: 'Dennied Access!',
            });
        }
        const isValidPermission = req === null || req === void 0 ? void 0 : req.objKey.permission.includes(permission);
        if (!isValidPermission) {
            return res.status(403).json({
                code: -1,
                message: 'Dennied Access!',
            });
        }
        if (isValidPermission) {
            return next();
        }
    });
};
exports.Permission = Permission;
//# sourceMappingURL=checkAuth.js.map