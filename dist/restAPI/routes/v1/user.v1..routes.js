"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const access_controller_1 = __importDefault(require("../../controllers/access.controller"));
const asyncHandler_1 = require("../../../helpers/asyncHandler");
const auth_ultils_1 = require("../../../auth/auth.ultils");
route.post('/register', (0, asyncHandler_1.asyncHandler)(access_controller_1.default.Register));
route.post('/login', (0, asyncHandler_1.asyncHandler)(access_controller_1.default.Login));
route.use(auth_ultils_1.Authentication);
route.post('/logout', (0, asyncHandler_1.asyncHandler)(access_controller_1.default.Logout));
module.exports = route;
//# sourceMappingURL=user.v1..routes.js.map