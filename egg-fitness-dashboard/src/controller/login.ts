//home.ts

import { Controller } from 'egg'
import { bp } from '../lib/egg-blueprint/index'
import { bodyValidator, Require } from '../lib/decorator/validator'
import * as Crypto from 'crypto'

var LOGIN_RAND = Date.now()

class UserEntity {
    @Require userName: string

    @Require passWord: string
}

export default class LoginController extends Controller {
    @bp.post('/login')
    @bodyValidator(UserEntity)
    async login(body: UserEntity) {
        //账号密码->是否存在->登陆结果

        const user: any | null = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        })

        if (user) {
            this.ctx.body = `hi, egg 3123`

            if (user.passWord === body.passWord) {
                console.log('登陆成功')
            }
        }

        const sha1 = Crypto.createHash('sha1')

        LOGIN_RAND++
        sha1.update(body.userName + LOGIN_RAND)
        // console.log(sha1.digest('hex'))
    }

    @bp.get('/')
    async apple() {
        this.ctx.body = `hi, egg `
    }
}
