

const Burn = require("../dist/src/core").Burn;


let assert = require("chai").assert;
const app = new Burn;
const server = app.run();

describe("app start", () => {
    it('启动无错误', async () => {


        setImmediate(function () { server.emit('close') });
    })

    it('get请求没问题', async () => {
        const j = await app.curl('http://127.0.0.1:3000/haha');
        assert.equal(j.body, 'test');

    })



})

setTimeout(() => {
    server.close(function () { console.log('Server closed!'); });
}, 1000)

