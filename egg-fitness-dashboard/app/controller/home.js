"use strict";
//home.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
function log() {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value; //被装饰的函数被保存在value中.
        descriptor.value = function () {
            console.log(`函数${key}()被访问了`);
            originFunction.apply(this, arguments);
        };
    };
}
class HomeController extends egg_1.Controller {
    async index() {
        this.ctx.body = `hi, egg `;
    }
    async book() {
        this.ctx.body = `hi, egg `;
    }
    async apple() {
        this.ctx.body = `hi, egg `;
    }
    async pink() {
        this.ctx.body = `hi, egg `;
    }
}
__decorate([
    log()
], HomeController.prototype, "index", null);
__decorate([
    log()
], HomeController.prototype, "book", null);
__decorate([
    log()
], HomeController.prototype, "apple", null);
__decorate([
    log()
], HomeController.prototype, "pink", null);
exports.default = HomeController;
