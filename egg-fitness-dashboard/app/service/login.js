"use strict";
//home.ts
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const DUPLICATE = 1062;
class LoginService extends egg_1.Service {
    async registerAccount(info) {
        try {
            await this.ctx.model.User.create({
                userName: info.userName,
                passWord: info.password
            });
            return {
                message: 'Success',
                status: 201
            };
        }
        catch (e) {
            if (e.parent.errno === DUPLICATE) {
                return {
                    message: 'Fail',
                    status: 409
                };
            }
            else {
                return {
                    message: 'Fail',
                    status: 500
                };
            }
        }
    }
}
exports.default = LoginService;
