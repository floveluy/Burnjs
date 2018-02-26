"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    blue(str) {
        console.log(`\x1b[34m${str}\x1b[0m`);
    }
    green(str) {
        console.log(`\x1b[32m${str}\x1b[0m`);
    }
    error(str) {
        console.log(`[\x1b[31m Error \x1b[0m]:\x1b[31m ${str}\x1b[0m`);
    }
}
exports.default = new Log;
