"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = require("../utils/constant");
var ApiKeySchema = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    permission: {
        type: [String],
        required: true,
        enum: [constant_1.ROLES.ADMIN, constant_1.ROLES.USER, constant_1.ROLES.SELLER],
    },
}, {
    collection: '_ApiKey',
    timestamps: true,
});
exports.default = mongoose_1.default.model('ApiKey', ApiKeySchema);
//# sourceMappingURL=apikey.model.js.map