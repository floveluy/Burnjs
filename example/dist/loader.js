"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Router = require("koa-router");
const blueprint_1 = require("./blueprint");
class Loader {
    constructor(app) {
        this.router = new Router;
        this.controller = {};
        this.app = app;
    }
    loadService() {
        const service = fs.readdirSync(__dirname + '/service');
        var that = this;
        Object.defineProperty(this.app.context, 'service', {
            get() {
                if (!this['cache']) {
                    this['cache'] = {};
                }
                const loaded = this['cache'];
                if (!loaded['service']) {
                    loaded['service'] = {};
                    service.forEach((d) => {
                        const name = d.split('.')[0];
                        const mod = require(__dirname + '/service/' + d);
                        loaded['service'][name] = new mod(this, that.app);
                    });
                    return loaded.service;
                }
                return loaded.service;
            }
        });
    }
    loadController() {
        const dirs = fs.readdirSync(__dirname + '/controller');
        dirs.forEach((filename) => {
            require(__dirname + '/controller/' + filename).default;
        });
    }
    loadConfig() {
        const configDef = __dirname + '/config/config.default.js';
        const configEnv = __dirname + (process.env.NODE_ENV === 'production' ? '/config/config.pro.js' : '/config/config.dev.js');
        const conf = require(configEnv);
        const confDef = require(configDef);
        const merge = Object.assign({}, conf, confDef);
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge;
            }
        });
    }
    loadRouter() {
        this.loadController();
        this.loadService();
        this.loadConfig();
        const r = blueprint_1.bp.getRoute();
        Object.keys(r).forEach((url) => {
            r[url].forEach((object) => {
                this.router[object.httpMethod](url, async (ctx) => {
                    const instance = new object.constructor(ctx, this.app);
                    await instance[object.handler]();
                });
            });
        });
        return this.router.routes();
    }
}
exports.Loader = Loader;
