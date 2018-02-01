const Burn = require("../dist/core").Burn;


let expect = require("chai").expect;

describe("app start", () => {
    it('启动无错误', function (done) {
        const app = new Burn;
        app.run();
        done();
    })
    it('装载config', function (done) {
        const app = new Burn;
        app.run();
        expect(app.config.middleware[0]).equal('parse');        
        done();
    })

})