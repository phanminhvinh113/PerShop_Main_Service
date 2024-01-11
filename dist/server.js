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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const connect_graphql_1 = __importDefault(require("./graphQL/connect.graphql"));
const connect_restfull_1 = __importDefault(require("./restAPI/connect.restfull"));
const connect_mongo_1 = __importDefault(require("./database/connect.mongo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.URL_SERVER,
    optionsSuccessStatus: 200,
}));
app.use((0, morgan_1.default)('dev'));
function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all([connect_mongo_1.default, (0, connect_graphql_1.default)((_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT_GRAPHQL), (0, connect_restfull_1.default)((_b = process.env) === null || _b === void 0 ? void 0 : _b.PORT_REST_FULL)]);
        }
        catch (err) {
            console.error('💀 Error starting the node server', err);
        }
    });
}
void main();
//# sourceMappingURL=server.js.map