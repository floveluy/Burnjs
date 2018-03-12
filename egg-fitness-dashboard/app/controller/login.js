"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//home.ts
const validator_1 = require("../lib/decorator/validator");
const controller_base_1 = require("./controller-base");
const auth_1 = require("../lib/decorator/auth");
class UserEntity {
}
__decorate([
    validator_1.Require
], UserEntity.prototype, "userName", void 0);
__decorate([
    validator_1.Require
], UserEntity.prototype, "password", void 0);
class RegisterEntity extends UserEntity {
}
class LoginController extends controller_base_1.ControllerBase {
    async login(body) {
        //账号密码->是否存在->登陆结果
        const app = this.app;
        const user = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        });
        if (user) {
            if (user.passWord === body.password) {
                const token = app.jwt.sign({ token: 'asldjklj123jh1231hkjhlkjsakldjad123' }, app.config.jwt.secret); //生成一个token发给前端
                this.QuickSuccess({
                    token
                });
            }
            else {
                this.QuickFail('账号或者密码错误');
            }
        }
        else {
            this.QuickFail('没有这个用户');
        }
    }
    async apple() {
        const ctx = this.ctx;
        ctx.body = ' wex';
    }
    async quickRegister(body) {
        const { message, status } = await this.ctx.service.login.registerAccount(body);
        this.QuickSuccess({ message });
        this.ctx.status = status;
    }
}
__decorate([
    controller_base_1.ControllerBase.route.post('/login'),
    validator_1.bodyValidator(UserEntity)
], LoginController.prototype, "login", null);
__decorate([
    controller_base_1.ControllerBase.route.get('/'),
    auth_1.Auth
], LoginController.prototype, "apple", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/register'),
    validator_1.bodyValidator(RegisterEntity)
], LoginController.prototype, "quickRegister", null);
exports.default = LoginController;
