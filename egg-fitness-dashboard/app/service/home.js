"use strict";
//home.ts
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeService extends egg_1.Service {
    async addnumber(a, b) {
        return a + b;
    }
}
exports.default = HomeService;
