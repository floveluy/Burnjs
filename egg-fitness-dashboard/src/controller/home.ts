//home.ts

import { Controller } from 'egg';

function log() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;//被装饰的函数被保存在value中.
        descriptor.value = function () { //重写被装饰的函数
            console.log(`函数${key}()被访问了`);
            originFunction.apply(this, arguments);
        }
    }
}


export default class HomeController extends Controller {

    @log()
    async index() {
        this.ctx.body = `hi, egg `;

    }

    @log()
    async book() {
        this.ctx.body = `hi, egg `;

    }

    @log()
    async apple() {
        this.ctx.body = `hi, egg `;

    }

    @log()
    async pink() {
        this.ctx.body = `hi, egg `;
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}