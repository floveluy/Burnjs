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
// import { Auth } from '../lib/decorator/auth'
const cyp = require("crypto");
const ReactDOMServer = require("react-dom/server");
const reactApp_1 = require("./reactApp");
const React = require("react");
const CONST_DATE = Date.now();
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
        if (user === null)
            throw new Error('没有这个用户');
        if (user.passWord !== body.password)
            throw new Error('账号或者密码错误');
        const sha1 = cyp.createHash('sha1');
        sha1.update(`${CONST_DATE + 1}` + body.userName + user.passWord);
        const userToken = sha1.digest('hex');
        const jwtToken = app.jwt.sign({ token: userToken }, app.config.jwt.secret); //生成一个token发给前端
        await this.ctx.model.User.update({
            token: userToken
        }, {
            where: {
                userName: body.userName
            }
        });
        this.QuickSuccess({
            token: jwtToken
        });
    }
    async apple() {
        const ctx = this.ctx;
        const shit = '顶层数据';
        const body = ReactDOMServer.renderToString(React.createElement(reactApp_1.default, { name: shit }));
        const html = `
        <!DOCTYPE html>
            <html>
                <head>
                <title>hahahha</title>
                </head>
                <body style="margin:0">
                <div id="root">${body}</div>
                <a href='/haha'>asdasdas</a>
                </body>
                <script type="text/javascript">
                window.INIT_STATE= "${shit}";
                </script>
                <script src="/public/react-dragger-layout.js" >
                </script>
               
            </html>
        `;
        ctx.body = html;
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
    controller_base_1.ControllerBase.route.get('/')
], LoginController.prototype, "apple", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/register'),
    validator_1.bodyValidator(RegisterEntity)
], LoginController.prototype, "quickRegister", null);
exports.default = LoginController;
