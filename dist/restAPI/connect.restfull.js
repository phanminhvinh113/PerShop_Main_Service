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
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const handle_error_1 = require("./handle.error");
require('dotenv').config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(index_routes_1.default);
app.use(handle_error_1.RequestError);
app.use(handle_error_1.ErrorHandler);
const ConnectRestFull = (PORT = 3550) => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        try {
            console.log(`Server REST FULL running on: http://localhost:${PORT}`);
        }
        catch (error) {
            console.log('Error connect REST FULL', error);
        }
    });
});
exports.default = ConnectRestFull;
//# sourceMappingURL=connect.restfull.js.map