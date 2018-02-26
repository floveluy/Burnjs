"use strict";
//home.ts
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }
}
exports.default = HomeController;
// declare module 'egg' {
//     export interface IController {
//         home: HomeController;
//     }
// }
