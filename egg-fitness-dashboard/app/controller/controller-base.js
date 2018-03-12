"use strict";
//home.ts
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const index_1 = require("../lib/egg-blueprint/index");
class ControllerBase extends egg_1.Controller {
    /**
     * 返回正确结果
     * @param object
     */
    QuickSuccess(object) {
        const Success = {
            Success: true,
            message: 'Success',
            payload: Object.assign({}, object)
        };
        this.ctx.response.body = JSON.stringify(Success);
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        });
    }
    QuickFail(message) {
        const Fail = {
            Success: false,
            message: message
        };
        this.ctx.response.body = JSON.stringify(Fail);
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        });
    }
    /**
     * 获取当前用户信息
     */
    async CurrentUser() {
        const { token } = this.ctx.jwtDecode;
        const user = await this.ctx.model.User.findOne({
            where: {
                token
            }
        });
        if (user)
            return user;
        throw Error('user-fetch-fail');
    }
}
ControllerBase.route = index_1.bp;
exports.ControllerBase = ControllerBase;
