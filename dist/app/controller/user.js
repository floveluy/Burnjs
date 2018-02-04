"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../../src/base/controller");
const blueprint_1 = require("../../src/blueprint");
class user extends controller_1.Controller {
    async index(body) {
        console.log(body.content);
        this.ctx.body = 'good routing';
    }
}
__decorate([
    blueprint_1.bp.post('/uc')
], user.prototype, "index", null);
exports.default = user;
