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
exports.ErrorHandler = exports.RequestError = void 0;
class RequestErr extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
const RequestError = (_req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = new RequestErr('Not Found!', 404);
    return next(error);
});
exports.RequestError = RequestError;
const ErrorHandler = (err, _req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(err.status || 500);
    res.json({
        code: err.status,
        message: 'Error',
        error: err.message,
    });
});
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=handle.error.js.map