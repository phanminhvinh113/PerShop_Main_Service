"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../utils/constant");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: {
        type: String,
        enum: [constant_1.STATE_USER.ACTIVE, constant_1.STATE_USER.UN_ACTIVE],
        default: constant_1.STATE_USER.UN_ACTIVE,
    },
    verify: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    roles: {
        type: Array,
        default: [],
    },
}, {
    collection: '_User',
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.model.js.map