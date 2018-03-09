"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 检测auth，登陆者必须带有jwt，不然就挂.
 * @param target
 * @param key
 * @param descriptor
 */
function Auth(target, key, descriptor) {
    var originFun = descriptor.value;
    descriptor.value = async function () {
        var c = this;
        try {
            var token = c.ctx.request.headers['authentication'];
            if (token) {
                token = token.split(' ')[1];
            }
            else {
                token =
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MjA1NjY5Mjh9.OP8r2-asdasda';
            }
            c.app.jwt.verify(token, c.app.config.jwt.secret);
            await originFun.apply(this, arguments);
        }
        catch (e) {
            if (e.message === 'invalid signature') {
                c.ctx.body = 'login invalid';
                c.ctx.status = 401;
            }
        }
    };
}
exports.Auth = Auth;
