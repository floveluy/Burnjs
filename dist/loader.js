"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const fs = require("fs");
const logger_1 = require("./logger");
const HASLOADED = Symbol('hasloaded');
class Loader {
    constructor(app) {
        this.controller = {};
        this.koaRouter = new KoaRouter;
        this.app = app;
    }
    appDir() {
        return __dirname.substr(0, __dirname.length - 4);
    }
    fileLoader(url) {
        const merge = this.appDir() + url;
        return fs.readdirSync(merge).map((name) => {
            return {
                module: require(merge + '/' + name),
                filename: name
            };
        });
    }
    convertController(ctler, funcNames) {
        const tmp = {};
        funcNames.forEach((name) => {
            if (name !== 'constructor') {
                tmp[name] = {
                    class: ctler,
                    funcName: name
                };
            }
        });
        return tmp;
    }
    loadController() {
        const controllers = this.fileLoader('app/controller');
        controllers.forEach((mod) => {
            const names = Object.getOwnPropertyNames(mod.module.prototype);
            Object.defineProperty(this.controller, mod.module.name.toLowerCase(), {
                value: this.convertController(mod.module, names)
            });
        });
    }
    loadRouter() {
        const routerUrl = this.appDir() + 'app/router.js';
        const routing = require(routerUrl)({
            controller: this.controller
        });
        Object.keys(routing).forEach((key) => {
            const [method, url] = key.split(' ');
            logger_1.default.blue(method + url);
            const d = routing[key];
            this.koaRouter[method](url, async (ctx) => {
                const instance = new d.class(ctx, this.app);
                await instance[d.funcName]();
            });
        });
        this.app.use(this.koaRouter.routes());
    }
    loadToContext(target, app, property) {
        Object.defineProperty(app.context, property, {
            get() {
                if (!this[HASLOADED]) {
                    this[HASLOADED] = {};
                }
                const loaded = this[HASLOADED];
                if (!loaded[property]) {
                    loaded[property] = {};
                    target.forEach((mod) => {
                        loaded[property][mod.module.name] = new mod.module(this, app);
                    });
                    return loaded.service;
                }
                return loaded.service;
            }
        });
    }
    loadService() {
        const service = this.fileLoader('app/service');
        this.loadToContext(service, this.app, 'service');
    }
    loadMiddleware() {
        const middleware = this.fileLoader('app/middleware');
        const registedMid = this.app.config['middleware'];
        if (!registedMid)
            return; //如果中间件不存在
        registedMid.forEach((name) => {
            logger_1.default.blue(name);
            for (const index in middleware) {
                const mod = middleware[index];
                const fname = mod.filename.split('.')[0];
                if (name === fname) {
                    this.app.use(mod.module());
                }
            }
        });
    }
    loadConfig() {
        const configDef = this.appDir() + 'app/config/config.default.js';
        const configEnv = this.appDir()
            + (process.env.NODE_ENV === 'production' ? 'app/config/config.pro.js' : 'app/config/config.dev.js');
        const conf = require(configEnv);
        const confDef = require(configDef);
        const merge = Object.assign({}, conf, confDef);
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge;
            }
        });
    }
    load() {
        this.loadController();
        this.loadService();
        this.loadConfig();
        this.loadMiddleware();
        this.loadRouter(); //依赖loadController 
    }
}
exports.Loader = Loader;
