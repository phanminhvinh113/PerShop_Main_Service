"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER = exports.Track_Device = exports.FindUserByField = exports.ReasonStatusCode = exports.StatusCode = exports.STATE_USER = exports.ROLES = void 0;
exports.ROLES = Object.freeze({
    ADMIN: '0000_',
    USER: '1111_',
    SELLER: '2222_',
});
exports.STATE_USER = Object.freeze({
    ACTIVE: 'active',
    UN_ACTIVE: 'unactive',
});
exports.StatusCode = Object.freeze({
    BAD_REQUEST: 400,
    UNATHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    NOT_ACCEPTABLE: 406,
    TOO_MANY_REQUEST: 429,
    SUCCESS: 200,
    COMPLETED: 201,
});
exports.ReasonStatusCode = Object.freeze({
    BAD_REQUEST: '	Bad Request',
    UNATHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    CONFLICT: 'Conflict Error',
    NOT_ACCEPTABLE: 'Not Acceptable',
    TOO_MANY_REQUEST: 'Too Many Requests',
    SUCCESS: 'OK!',
    COMPLETED: 'Completed!',
});
exports.FindUserByField = Object.freeze({
    EMAIL: 'email',
    PHONE: 'phone',
});
exports.Track_Device = Object.freeze({
    IP_OLD: 'O_0000_ip',
    IP_NEW: 'N_1111_ip',
    DEVICE_OLD: 'O_0000_d',
    DEVICE_NEW: 'N_1111_d',
});
exports.HEADER = Object.freeze({
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
});
//# sourceMappingURL=constant.js.map