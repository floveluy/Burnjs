"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//home.ts
const index_1 = require("../lib/egg-blueprint/index");
const validator_1 = require("../lib/decorator/validator");
const Crypto = require("crypto");
const controller_base_1 = require("./controller-base");
var LOGIN_RAND = Date.now();
class UserEntity {
}
__decorate([
    validator_1.Require
], UserEntity.prototype, "userName", void 0);
__decorate([
    validator_1.Require
], UserEntity.prototype, "passWord", void 0);
class LoginController extends controller_base_1.ControllerBase {
    async login(body) {
        //账号密码->是否存在->登陆结果
        const user = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        });
        if (user) {
            if (user.passWord === body.passWord) {
                console.log('登陆成功');
                const app = this.app;
                const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret); //生成一个token发给前端
                this.ctx.body = { token };
            }
        }
        const sha1 = Crypto.createHash('sha1');
        LOGIN_RAND++;
        sha1.update(body.userName + LOGIN_RAND);
    }
    async apple() {
        const ctx = this.ctx;
        const app = this.app;
        // console.log(ctx.session.key)
        let n = ctx.session.wex || 0;
        ctx.session.wex = ++n;
        ctx.body = ' wex';
        // var token = (ctx.request.body && (<any>ctx.request.body).access_token) || (ctx.request.query && ctx.request.query.access_token)
        const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);
        var decoded = app.jwt.verify(token, app.config.jwt.secret);
        console.log(decoded);
    }
}
__decorate([
    index_1.bp.post('/login'),
    validator_1.bodyValidator(UserEntity)
], LoginController.prototype, "login", null);
__decorate([
    controller_base_1.ControllerBase.route.get('/')
], LoginController.prototype, "apple", null);
exports.default = LoginController;
