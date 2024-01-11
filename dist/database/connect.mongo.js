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
const mongoose_1 = require("mongoose");
require("dotenv").config();
const URL_MONGGO_DATABASE = process.env.URL_MONGO_DATABASE || "";
class DataBase {
    constructor() {
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.connect)(URL_MONGGO_DATABASE, {
                    maxPoolSize: 100,
                });
                console.log("ConnectDB_Mongo Success!");
            }
            catch (error) {
                console.log(`Error:${error}`);
            }
        });
    }
    static getInstance() {
        if (!DataBase.instance) {
            DataBase.instance = new DataBase();
        }
        return DataBase.instance;
    }
}
const instanceMongoDB = DataBase.getInstance();
exports.default = instanceMongoDB;
//# sourceMappingURL=connect.mongo.js.map