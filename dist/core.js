"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const loader_1 = require("./loader");
const logger_1 = require("./logger");
class Burn extends Koa {
    constructor() {
        super();
        this.config = {};
        this.loader = new loader_1.Loader(this);
        this.port = 3000;
        this.ip = '127.0.0.1';
    }
    run() {
        this.loader.load();
        this.listen(this.port, this.ip, () => {
            logger_1.default.green(`Burn服务器运行在:${this.ip}:${this.port}`);
        });
    }
}
exports.Burn = Burn;
