import * as KoaRouter from 'koa-router';
import * as fs from 'fs';
import logger from './logger';
import { BaseContext } from 'koa';
import { Burn, KV } from './core';


const HASLOADED = Symbol('hasloaded')

interface FileModule {
    module: any,
    filename: string
}

export class Loader {
    private controller: KV = {};
    private koaRouter: any = new KoaRouter;
    private app: Burn;


    constructor(app: Burn) {
        this.app = app;
    }

    private appDir() {
        return __dirname.substr(0, __dirname.length - 4);
    }

    private fileLoader(url: string): Array<FileModule> {
        const merge = this.appDir() + url;

        return fs.readdirSync(merge).map((name) => {
            return {
                module: require(merge + '/' + name),
                filename: name
            };
        });
    }
    private convertController(ctler: object, funcNames: Array<string>) {
        const tmp: { [key: string]: any } = {};
        funcNames.forEach((name) => {
            if (name !== 'constructor') {
                tmp[name] = {
                    class: ctler,
                    funcName: name
                };
            }
        })
        return tmp;
    }

    loadController() {
        const controllers = this.fileLoader('app/controller');
        controllers.forEach((mod) => {
            const names = Object.getOwnPropertyNames(mod.module.prototype);
            Object.defineProperty(this.controller, mod.module.name.toLowerCase(), {
                value: this.convertController(mod.module, names)
            })
        })
    }

    loadRouter() {
        const routerUrl = this.appDir() + 'app/router.js';
        const routing = require(routerUrl)({
            controller: this.controller
        });

        Object.keys(routing).forEach((key) => {
            const [method, url] = key.split(' ');
            logger.blue(method + url)
            const d = routing[key];
            this.koaRouter[method](url, async (ctx: BaseContext) => {
                const instance = new d.class(ctx, this.app);
                await instance[d.funcName]();
            })
        });
        this.app.use(this.koaRouter.routes());
    }

    loadToContext(target: Array<FileModule>, app: Burn, property: string) {
        Object.defineProperty(app.context, property, {
            get() {
                if (!(<any>this)[HASLOADED]) {
                    (<any>this)[HASLOADED] = {};
                }
                const loaded = (<any>this)[HASLOADED];
                if (!loaded[property]) {
                    loaded[property] = {};
                    target.forEach((mod) => {
                        loaded[property][mod.module.name] = new mod.module(this, app);
                    })
                    return loaded.service
                }
                return loaded.service;
            }
        })
    }


    loadService() {
        const service = this.fileLoader('app/service');
        this.loadToContext(service, this.app, 'service');
    }

    loadMiddleware() {
        const middleware = this.fileLoader('app/middleware');
        const registedMid = this.app.config['middleware'];

        if (!registedMid) return;//如果中间件不存在

        registedMid.forEach((name: string) => {
            logger.blue(name);
            for (const index in middleware) {
                const mod = middleware[index];
                const fname = mod.filename.split('.')[0];
                if (name === fname) {
                    this.app.use(mod.module());
                }
            }
        })
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
                return merge
            }
        })
    }

    load() {
        this.loadController();
        this.loadService();
        this.loadConfig();
        this.loadMiddleware();
        this.loadRouter();//依赖loadController 
    }
}
