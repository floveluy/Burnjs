"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const loader_1 = require("./loader");
const logger_1 = require("./logger");
const controller_1 = require("./base/controller");
const service_1 = require("./base/service");
const req = require("request");
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
        return this.listen(this.port, this.ip, () => {
            logger_1.default.green(`Burn服务器运行在:${this.ip}:${this.port}`);
        });
    }
    stop() {
    }
    async curl(url) {
        const c = new Promise((resolve, reject) => {
            req.get(url, undefined, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve({ error, response, body });
                }
            });
        });
        return await c;
    }
}
Burn.Controller = controller_1.Controller;
Burn.Service = service_1.Service;
exports.Burn = Burn;
