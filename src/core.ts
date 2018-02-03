import * as Koa from 'koa';
import bodyParser = require("koa-bodyparser");
import { Loader } from './loader';
import logger from './logger';
import { Controller } from './base/controller';
import { Service } from './base/service';
import * as req from 'request';


export interface KV {
    [key: string]: any
}

export class Burn extends Koa {
    private loader: Loader;
    private port: number;
    private ip: string;
    static Controller: typeof Controller = Controller;
    static Service: typeof Service = Service;
    config: any = {};

    constructor() {
        super();
        this.loader = new Loader(this);
        this.port = 3000;
        this.ip = '127.0.0.1';
    }

    run() {
        this.use(bodyParser());
        this.loader.load();
        return this.listen(this.port, this.ip, () => {
            logger.green(`Burn服务器运行在:${this.ip}:${this.port}`)
        })
    }
    stop() {

    }

    async curl(url: string) {
        const c = new Promise((resolve, reject) => {
            req.get(url, undefined, (error: any, response: any, body: any) => {
                if (error) {
                    reject(error)
                } else {
                    resolve({ error, response, body });
                }
            })
        })

        return await c

    }
}