import * as KoaRouter from 'koa-router';
import * as fs from 'fs';
import logger from './logger';
import { BaseContext } from 'koa';
import { Burn } from './core';
import { bp } from './blueprint';


const HASLOADED = Symbol('hasloaded')

interface FileModule {
    module: any,
    filename: string
}

interface StringSub {
    source: string,
    isFound: boolean
}

export class Loader {
    private koaRouter: any = new KoaRouter;
    private app: Burn;

    constructor(app: Burn) {
        this.app = app;
    }

    private appDir() {
        const subString = removeString(__dirname, 'node_modules');//如果包在node_modules中，正式环境
        if (subString.isFound) {
            return subString.source;
        }
        return subString.source.substr(0, subString.source.length - 4) + '/';
    }

    private fileLoader(url: string): Array<FileModule> {
        const merge = this.appDir() + url;

        return fs.readdirSync(merge).map((name) => {
            return {
                module: require(merge + '/' + name).default,
                filename: name
            };
        });
    }

    loadController() {
        this.fileLoader('app/controller');
    }

    loadRouter() {
        const r = bp.getRoute();
        Object.keys(r).forEach((url) => {
            r[url].forEach((object) => {
                this.koaRouter[object.httpMethod](url, async (ctx: BaseContext) => {
                    const instance = new object.constructor(ctx, this.app);
                    await instance[object.handler](ctx.request.body);
                })
            })
        })

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
                        const key = mod.filename.split('.')[0];
                        loaded[property][key] = new mod.module(this, app);
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
        try {
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
        } catch (e) { }
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

function removeString(source: string, str: string): StringSub {
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