"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const blueprint_1 = require("../blueprint");
//user.ts
class User extends base_1.Controller {
    async user() {
        this.ctx.body = this.ctx.service.check.index();
    }
    getConfig() {
        return this.app['config'];
    }
    async userInfo() {
        this.ctx.body = '我是装饰器';
    }
}
__decorate([
    blueprint_1.bp.get('/test')
], User.prototype, "userInfo", null);
exports.default = User;
