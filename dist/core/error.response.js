"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.AuthFailedError = exports.BadRequestError = exports.ConflictRequestError = void 0;
const constant_1 = require("../utils/constant");
class ErrorReponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
class ConflictRequestError extends ErrorReponse {
    constructor(message = constant_1.ReasonStatusCode.CONFLICT, statusCode = constant_1.StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}
exports.ConflictRequestError = ConflictRequestError;
class BadRequestError extends ErrorReponse {
    constructor(message = constant_1.ReasonStatusCode.BAD_REQUEST, statusCode = constant_1.StatusCode.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BadRequestError = BadRequestError;
class AuthFailedError extends ErrorReponse {
    constructor(message = constant_1.ReasonStatusCode.UNATHORIZED, statusCode = constant_1.StatusCode.UNATHORIZED) {
        super(message, statusCode);
    }
}
exports.AuthFailedError = AuthFailedError;
class NotFoundError extends ErrorReponse {
    constructor(message = constant_1.ReasonStatusCode.NOT_FOUND, statusCode = constant_1.StatusCode.NOT_FOUND) {
        super(message, statusCode);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=error.response.js.map