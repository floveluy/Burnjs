//home.ts

import { Controller } from 'egg'
import { bp } from '../lib/egg-blueprint/index'
import { bodyValidator } from '../lib/decorator/validator'

function log() {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value //被装饰的函数被保存在value中.
        descriptor.value = function() {
            //重写被装饰的函数
            console.log(`函数${key}()被访问了`)
            originFunction.apply(this, arguments)
        }
    }
}

class UserEntity {
    userName: string
}

export default class LoginController extends Controller {
    @bp.post('/login')
    @bodyValidator(UserEntity)
    async index() {
        this.ctx.body = `hi, egg 3123`

        // http -f POST http://127.0.0.1:7001/login content=好好学习 articleID='123532' title='测试'
    }

    @log()
    async apple() {
        this.ctx.body = `hi, egg `
    }

    @log()
    async pink() {
        this.ctx.body = `hi, egg `
    }
}
