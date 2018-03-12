//home.ts
import { bodyValidator, Require } from '../lib/decorator/validator'
import { ControllerBase } from './controller-base'
import { Auth } from '../lib/decorator/auth'

class UserEntity {
    @Require userName: string

    @Require password: string
}

class RegisterEntity extends UserEntity {}

export default class LoginController extends ControllerBase {
    @ControllerBase.route.post('/login')
    @bodyValidator(UserEntity)
    async login(body: UserEntity) {
        //账号密码->是否存在->登陆结果
        const app: any = this.app
        const user: any | null = await this.ctx.model.User.findOne({
            where: {
                userName: body.userName
            }
        })

        if (user) {
            if (user.passWord === body.password) {
                const token = app.jwt.sign(
                    { token: 'asldjklj123jh1231hkjhlkjsakldjad123' },
                    app.config.jwt.secret
                ) //生成一个token发给前端
                this.QuickSuccess({
                    token
                })
            } else {
                this.QuickFail('账号或者密码错误')
            }
        } else {
            this.QuickFail('没有这个用户')
        }
    }

    @ControllerBase.route.get('/')
    @Auth
    async apple() {
        const ctx = this.ctx
        ctx.body = ' wex'
    }

    @ControllerBase.route.post('/register')
    @bodyValidator(RegisterEntity)
    async quickRegister(body: RegisterEntity) {
        const {
            message,
            status
        } = await this.ctx.service.login.registerAccount(body)
        this.QuickSuccess({ message })
        this.ctx.status = status
    }
}
