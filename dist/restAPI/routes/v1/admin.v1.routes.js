"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get("/get-all-user", (_req, res) => {
    res.status(200).json({
        code: 0,
        data: [],
    });
});
module.exports = route;
//# sourceMappingURL=admin.v1.routes.js.map