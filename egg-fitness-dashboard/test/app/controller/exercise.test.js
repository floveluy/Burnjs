;('use strict')
const { jwtCode } = require('./home.test')

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/exercise.test.js', () => {
    it('创建动作 /exercise/create', () => {
        return app
            .httpRequest()
            .post('/exercise/create')
            .set('Content-Type', 'application/json')
            .set('Authentication', 'Bearer ' + jwtCode)
            .send('{"type":"weight","name":"benchpress"}')
            .expect(200)
    })

    it('为动作增添组 /exercise/create', () => {
        return app
            .httpRequest()
            .put('/exercise/create')
            .set('Content-Type', 'application/json')
            .set('Authentication', 'Bearer ' + jwtCode)
            .send('{"sets":["哈哈","哈哈哈","是饿"],"name":"benchpress"}')
            .expect(200)
    })

    it('获取某个用户的动作 /exercise', () => {
        return app
            .httpRequest()
            .get('/exercise')
            .set('Authentication', 'Bearer ' + jwtCode)
            .expect(200)
    })
})
