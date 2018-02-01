"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
//user.ts
class User extends base_1.Controller {
    async user() {
        this.ctx.body = this.ctx.service.check.index();
    }
    getConfig() {
        return this.app['config'];
    }
    async userInfo() {
        this.ctx.body = this.getConfig().middleware[0];
    }
}
exports.default = User;
