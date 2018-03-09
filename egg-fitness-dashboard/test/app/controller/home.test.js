'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
    it('should assert', function*() {
        const pkg = require('../../../package.json')
        assert(app.config.keys.startsWith(pkg.name))

        // const ctx = app.mockContext({});
        // yield ctx.service.xx();
    })

    it('loginCheck /login', () => {
        return app
            .httpRequest()
            .post('/login')
            .set('Content-Type', 'application/json')
            .send('{"userName":"floveluy","passWord":"metal_gear2"}')
            .expect(200)
    })

    it('不登陆不能访问 /', () => {
        return app
            .httpRequest()
            .get('/')
            .set('Content-Type', 'application/json')
            .send('{"userName":"tj","passWord":"tobi"}')
            .expect(401)
    })

    it('登陆了以后就可以访问了 /', () => {
        return app
            .httpRequest()
            .get('/')
            .set('Authentication',"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MjA1NjY5Mjh9.OP8r2-JqzwuujfgKTq4KBRHXmUGnr_WFUx3uSmRN6hM")
            .set('Content-Type', 'application/json')
            .send('{"userName":"tj","passWord":"tobi"}')
            .expect(200)
    })
})
