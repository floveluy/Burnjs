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
const index_1 = require("../lib/egg-blueprint/index");
const validator_1 = require("../lib/decorator/validator");
function log() {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value; //被装饰的函数被保存在value中.
        descriptor.value = function () {
            //重写被装饰的函数
            console.log(`函数${key}()被访问了`);
            originFunction.apply(this, arguments);
        };
    };
}
class UserEntity {
}
class LoginController extends egg_1.Controller {
    async index() {
        this.ctx.body = `hi, egg 3123`;
        // http -f POST http://127.0.0.1:7001/login content=好好学习 articleID='123532' title='测试'
    }
    async apple() {
        this.ctx.body = `hi, egg `;
    }
    async pink() {
        this.ctx.body = `hi, egg `;
    }
}
__decorate([
    index_1.bp.post('/login'),
    validator_1.bodyValidator(UserEntity)
], LoginController.prototype, "index", null);
__decorate([
    log()
], LoginController.prototype, "apple", null);
__decorate([
    log()
], LoginController.prototype, "pink", null);
exports.default = LoginController;
