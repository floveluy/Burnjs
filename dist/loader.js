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
        const subString = removeString(__dirname, 'node_modules');
        if (subString.isFound) {
            return subString.source;
        }
        return subString.source.substr(0, subString.source.length - 4);
    }
    fileLoader(url) {
        const merge = this.appDir() + url;
        return fs.readdirSync(merge).map((name) => {
            return {
                module: require(merge + '/' + name).default,
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
            const filename = mod.filename.split('.')[0];
            const names = Object.getOwnPropertyNames(mod.module.prototype);
            Object.defineProperty(this.controller, filename.toLowerCase(), {
                value: this.convertController(mod.module, names)
            });
        });
    }
    loadRouter() {
        const routerUrl = this.appDir() + 'app/router.js';
        const routing = require(routerUrl).default({
            controller: this.controller
        });
        Object.keys(routing).forEach((key) => {
            const [method, url] = key.split(' ');
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
                        const key = mod.filename.split('.')[0];
                        loaded[property][key] = new mod.module(this, app);
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
        try {
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
        catch (e) { }
    }
    loadConfig() {
        const configDef = this.appDir() + 'app/config/config.default.js';
        const configEnv = this.appDir()
            + (process.env.NODE_ENV === 'production' ? 'app/config/config.pro.js' : 'app/config/config.dev.js');
        const conf = require(configEnv).default;
        const confDef = require(configDef).default;
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
function removeString(source, str) {
    const index = source.indexOf(str);
    if (index > 0) {
        return {
            source: source.substr(0, index),
            isFound: true
        };
    }
    return {
        source: source,
        isFound: false
    };
}
