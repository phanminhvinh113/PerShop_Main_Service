"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoData = void 0;
const lodash_1 = __importDefault(require("lodash"));
const getInfoData = (fileds, object = {}) => {
    return lodash_1.default.pick(object, fileds);
};
exports.getInfoData = getInfoData;
//# sourceMappingURL=index.utils.js.map