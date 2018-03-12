/**
 * 检测auth，登陆者必须带有jwt，不然就挂.
 * @param target
 * @param key
 * @param descriptor
 */
export function Auth(target: any, key: string, descriptor: PropertyDescriptor) {
    var originFun = descriptor.value

    descriptor.value = async function() {
        var c = <any>this
        try {
            var token = c.ctx.request.headers['authorization']
            if (token) {
                token = token.split(' ')[1]
            } else {
                token =
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MjA1NjY5Mjh9.OP8r2-asdasda'
            }

            var decoded = c.app.jwt.verify(token, c.app.config.jwt.secret)

            c.ctx.jwtDecode = decoded
            await originFun.apply(this, arguments)
        } catch (e) {
            if (e.message === 'invalid signature') {
                c.ctx.body = c.QuickFail('login invalid')
                c.ctx.status = 401
            }
            if (e.message === 'user-fetch-fail') {
                c.ctx.body = c.QuickFail('not such user')
                c.ctx.status = 401
            }
        }
    }
}
