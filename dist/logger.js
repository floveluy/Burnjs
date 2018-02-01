"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    blue(str) {
        console.log(`logs:\x1b[34m ${str}\x1b[0m`);
    }
    green(str) {
        console.log(`green:\x1b[32m ${str}\x1b[0m`);
    }
}
exports.default = new Log;
