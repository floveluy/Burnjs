//home.ts
import { bodyValidator, Require } from '../lib/decorator/validator'
import { ControllerBase } from './controller-base'
// import { Auth } from '../lib/decorator/auth'
import * as cyp from 'crypto'
import * as ReactDOMServer from 'react-dom/server'
import HelloWorld from './reactApp'
import * as React from 'react'

const CONST_DATE = Date.now()

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
        if (user === null) throw new Error('没有这个用户')
        if (user.passWord !== body.password) throw new Error('账号或者密码错误')

        const sha1 = cyp.createHash('sha1')
        sha1.update(`${CONST_DATE + 1}`+body.userName+user.passWord)
        const userToken = sha1.digest('hex')
        const jwtToken = app.jwt.sign(
            { token: userToken },
            app.config.jwt.secret
        ) //生成一个token发给前端
        await this.ctx.model.User.update(
            {
                token: userToken
            },
            {
                where: {
                    userName: body.userName
                }
            }
        )

        this.QuickSuccess({
            token: jwtToken
        })
    }

    @ControllerBase.route.get('/')
    async apple() {
        const ctx = this.ctx

        const shit = '顶层数据'
        const body = ReactDOMServer.renderToString(
            <HelloWorld name={shit} />
        )
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
        `
        ctx.body = html
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
