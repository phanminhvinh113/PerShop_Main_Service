"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStatusServer = exports.checkConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const os_1 = __importDefault(require("os"));
const checkConnection = () => {
    const numberConnection = mongoose_1.default.connections.length;
    console.log(`Server has ${numberConnection} connecting`);
};
exports.checkConnection = checkConnection;
const _SECONDS_PER_CHECK = 5000;
const checkStatusServer = () => {
    setInterval(() => {
        const numberConnection = mongoose_1.default.connections.length;
        const numCores = os_1.default.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnection = numCores * 10;
        console.log('Active connection:', numberConnection);
        console.log(`Memory Usage: ${memoryUsage / 1024 / 1024}MB | MaximunConnection/Cores: ${maxConnection}/${numCores}`);
        if (numberConnection - numberConnection * 0.1 > maxConnection) {
            console.log(`Warnning: The Server System is about to be overloaded! `);
        }
    }, _SECONDS_PER_CHECK);
};
exports.checkStatusServer = checkStatusServer;
//# sourceMappingURL=check.connection.js.map