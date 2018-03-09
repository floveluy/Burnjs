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
}
