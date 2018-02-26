import * as fs from 'fs';
import * as Router from 'koa-router';
import { BaseContext } from 'koa';
import * as Koa from 'koa';
export class Loader {
    router: Router = new Router;
    controller: any = {};
    app: Koa;
    constructor(app: Koa) {
        this.app = app;
    }
    loadService() {
        const service = fs.readdirSync(__dirname + '/service');

        Object.defineProperty(this.app.context, 'service', {
            get() {
                if (!(<any>this)['cache']) {
                    (<any>this)['cache'] = {};
                }
                const loaded = (<any>this)['cache'];
                if (!loaded['service']) {
                    loaded['service'] = {};
                    service.forEach((d) => {
                        const name = d.split('.')[0];
                        const mod = require(__dirname + '/service/' + d);

                        loaded['service'][name] = new mod(this);
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
            const property = filename.split('.')[0];
            const mod = require(__dirname + '/controller/' + filename).default;
            if (mod) {
                const methodNames = Object.getOwnPropertyNames(mod.prototype).filter((names) => {
                    if (names !== 'constructor') {
                        return names;
                    }
                })
                Object.defineProperty(this.controller, property, {
                    get() {
                        const merge: { [key: string]: any } = {};
                        methodNames.forEach((name) => {
                            merge[name] = {
                                type: mod,
                                methodName: name
                            }
                        })
                        return merge;
                    }
                })
            }
        })
    }

    loadRouter() {
        this.loadController();
        this.loadService();

        const mod = require(__dirname + '/router.js');
        const routers = mod(this.controller);
        console.log(routers);
        Object.keys(routers).forEach((key) => {
            const [method, path] = key.split(' ');

            (<any>this.router)[method](path, async (ctx: BaseContext) => {
                const _class = routers[key].type;
                const handler = routers[key].methodName;
                const instance = new _class(ctx);
                instance[handler]();
            })
        })
        return this.router.routes();
    }



}