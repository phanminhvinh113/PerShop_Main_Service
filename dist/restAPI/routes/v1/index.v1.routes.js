"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.use('/admin', require('./admin.v1.routes'));
route.use('/', require('./user.v1..routes'));
module.exports = route;
//# sourceMappingURL=index.v1.routes.js.map