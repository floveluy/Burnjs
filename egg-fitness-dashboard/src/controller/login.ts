//home.ts
import { bp } from '../lib/egg-blueprint/index'
import { bodyValidator, Require } from '../lib/decorator/validator'
import * as Crypto from 'crypto'
import { ControllerBase } from './controller-base'

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

        const user: any | null = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        })

        if (user) {
            if (user.passWord === body.passWord) {
                console.log('登陆成功')
                const app: any = this.app
                const token = app.jwt.sign(
                    { foo: 'bar' },
                    app.config.jwt.secret
                ) //生成一个token发给前端
                this.ctx.body = { token }
            }
        }

        const sha1 = Crypto.createHash('sha1')

        LOGIN_RAND++
        sha1.update(body.userName + LOGIN_RAND)
    }

    @ControllerBase.route.get('/')
    async apple() {
        const ctx = this.ctx
        const app: any = this.app
        // console.log(ctx.session.key)
        let n = ctx.session.wex || 0
        ctx.session.wex = ++n

        ctx.body = ' wex'

        // var token = (ctx.request.body && (<any>ctx.request.body).access_token) || (ctx.request.query && ctx.request.query.access_token)
        const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret)
        var decoded = app.jwt.verify(token, app.config.jwt.secret)
        console.log(decoded)
    }
}
