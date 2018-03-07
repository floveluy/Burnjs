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
const Crypto = require("crypto");
var LOGIN_RAND = Date.now();
class UserEntity {
}
__decorate([
    validator_1.Require
], UserEntity.prototype, "userName", void 0);
__decorate([
    validator_1.Require
], UserEntity.prototype, "passWord", void 0);
class LoginController extends egg_1.Controller {
    async index(body) {
        // await this.ctx.model.User.create({
        //     userName: body.userName,
        //     passWord: body.passWord
        // })
        const user = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        });
        if (user) {
            this.ctx.body = `hi, egg 3123`;
            console.log(user.passWord);
        }
        const sha1 = Crypto.createHash('sha1');
        LOGIN_RAND++;
        sha1.update(body.userName + LOGIN_RAND);
        // console.log(sha1.digest('hex'))
    }
    async apple() {
        this.ctx.body = `hi, egg `;
    }
}
__decorate([
    index_1.bp.post('/login'),
    validator_1.bodyValidator(UserEntity)
], LoginController.prototype, "index", null);
__decorate([
    index_1.bp.get('/')
], LoginController.prototype, "apple", null);
exports.default = LoginController;
