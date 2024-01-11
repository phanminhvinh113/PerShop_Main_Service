"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPLETED = exports.SUCCESS = void 0;
const constant_1 = require("../utils/constant");
class SuccessResponse {
    constructor(message, statusCode = constant_1.StatusCode.SUCCESS, reasonStatusCode = constant_1.ReasonStatusCode.SUCCESS, data = {}) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.data = data;
    }
    send(res, _headers = {}) {
        return res.status(this.status).json(this);
    }
}
class SUCCESS extends SuccessResponse {
    constructor(message, data) {
        super(message, data);
    }
}
exports.SUCCESS = SUCCESS;
class COMPLETED extends SuccessResponse {
    constructor(message, statusCode = constant_1.StatusCode.COMPLETED, reasonStatusCode = constant_1.ReasonStatusCode.COMPLETED, data) {
        super(message, statusCode, reasonStatusCode, data);
    }
}
exports.COMPLETED = COMPLETED;
//# sourceMappingURL=success.response.js.map