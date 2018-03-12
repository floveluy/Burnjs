//home.ts

import { Controller } from 'egg'
import { bp } from '../lib/egg-blueprint/index'

export class ControllerBase extends Controller {
    static route = bp
    /**
     * 返回正确结果
     * @param object
     */
    QuickSuccess(object: { [key: string]: any }) {
        const Success = {
            Success: true,
            message: 'Success',
            payload: { ...object }
        }
        this.ctx.response.body = JSON.stringify(Success)
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        })
    }

    QuickFail(message: string) {
        const Fail = {
            Success: false,
            message: message
        }

        this.ctx.response.body = JSON.stringify(Fail)
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        })
    }

    /**
     * 获取当前用户信息
     */
    async CurrentUser() {
        const { token } = this.ctx.jwtDecode
        const user = await this.ctx.model.User.findOne({
            where: {
                token
            }
        })
        if (user) return user
        throw Error('user-fetch-fail')
    }
}

declare module 'egg' {
    interface Context {
        jwtDecode: any
    }
}
