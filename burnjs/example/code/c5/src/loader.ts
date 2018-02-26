import * as fs from 'fs';
import * as Router from 'koa-router';
import { BaseContext } from 'koa';
export class Loader {
    router: Router = new Router;
    controller: any = {};

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