"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../auth/checkAuth");
const constant_1 = require("../../utils/constant");
const route = express_1.default.Router();
route.use(checkAuth_1.ApiKey);
route.use((0, checkAuth_1.Permission)(constant_1.ROLES.USER));
route.use('/v1/api', require('./v1/index.v1.routes'));
exports.default = route;
//# sourceMappingURL=index.routes.js.map