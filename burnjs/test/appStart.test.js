

const Burn = require("../dist/src/core").Burn;


let assert = require("chai").assert;
const app = new Burn;
const server = app.run();

describe("app start", () => {


    it('get请求没问题', async () => {
        const j = await app.curl('http://127.0.0.1:3000/uc');
        assert.equal(j.body, 'good');
    })
    it('post请求', async () => {
        const j = await app.post('http://127.0.0.1:3000/pxt', { foo: 'good' });

        assert.equal(j.body, '{"foo":"good"}');
    })

    it('restapi测试', async () => {
        const j = await app.curl('http://127.0.0.1:3000/haha');
        assert.equal(j.body, 'map');
    })

})

setTimeout(() => {
    server.close(function () { console.log('Server closed!'); });
}, 1000)

