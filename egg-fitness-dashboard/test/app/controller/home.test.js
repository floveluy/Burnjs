'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
    it('should assert', function*() {
        const pkg = require('../../../package.json')
        assert(app.config.keys.startsWith(pkg.name))

        // const ctx = app.mockContext({});
        // yield ctx.service.xx();
    })

    it('should GET /', () => {
        return app
            .httpRequest()
            .post('/login')
            .set('Content-Type', 'application/json')
            .send('{"userName":"tj","passWord":"tobi"}')
            .expect(400)
    })
})
