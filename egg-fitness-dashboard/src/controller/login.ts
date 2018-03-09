//home.ts
import { bp } from '../lib/egg-blueprint/index'
import { bodyValidator, Require } from '../lib/decorator/validator'
import * as Crypto from 'crypto'
import { ControllerBase } from './controller-base'
import { Auth } from '../lib/decorator/auth'

var LOGIN_RAND = Date.now()

class UserEntity {
    @Require userName: string

    @Require passWord: string
}

export default class LoginController extends ControllerBase {
    @bp.post('/login')
    @bodyValidator(UserEntity)
    async login(body: UserEntity) {
        //账号密码->是否存在->登陆结果
        const app: any = this.app
        console.log(Date.now());
        const user: any | null = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        })

        if (user) {
            if (user.passWord === body.passWord) {
                const token = app.jwt.sign(
                    { foo: 'bar' },
                    app.config.jwt.secret
                ) //生成一个token发给前端
                this.QuickSuccess({
                    token
                })
            }
        }
        console.log(Date.now());
        // const sha1 = Crypto.createHash('sha1')
        // LOGIN_RAND++
        // sha1.update(body.userName + LOGIN_RAND)
    }

    @ControllerBase.route.get('/')
    @Auth
    async apple() {
        const ctx = this.ctx
        ctx.body = ' wex'
    }
}
