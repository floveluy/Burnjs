"use strict";
//home.ts
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        const service = this.ctx.service;
        this.ctx.body = `hi, egg , this is ${service.home.addnumber(3, 5)}`;
    }
}
exports.default = HomeController;
