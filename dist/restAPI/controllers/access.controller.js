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
const access_service_1 = __importDefault(require("../service/access.service"));
const useragent_1 = __importDefault(require("useragent"));
class accessController {
    constructor() {
        this.Register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const IP_Device = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                const Device = useragent_1.default.parse(req.headers['user-agent']).os.toString();
                return res.status(201).json(yield access_service_1.default.registerService(Object.assign(Object.assign({}, req.body), { IP_Device, Device })));
            }
            catch (error) {
                return res.status(403).json({
                    code: -1,
                    status: error.status,
                    message: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        });
        this.Login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const IP_Device = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                const Device = useragent_1.default.parse(req.headers['user-agent']).os.toString();
                const response = yield access_service_1.default.Login(Object.assign(Object.assign({}, req.body), { IP_Device, Device }));
                if (response && ((_a = response.data) === null || _a === void 0 ? void 0 : _a.tokens)) {
                    req.cookies;
                }
                return res.status(201).json(response);
            }
            catch (error) {
                return res.status(403).json({
                    code: -1,
                    status: error.status,
                    message: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        });
        this.Logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(201).json(yield access_service_1.default.LogOut(req.keyStore, req.User));
            }
            catch (error) {
                return res.status(403).json({
                    code: -1,
                    status: error.status,
                    message: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        });
    }
}
exports.default = new accessController();
//# sourceMappingURL=access.controller.js.map