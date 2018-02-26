//home.ts

import { Controller } from 'egg';

export default class HomeController extends Controller {

    async index() {
        const service = this.ctx.service;
        this.ctx.body = `hi, egg , this is ${service.home.addnumber(3, 5)}`;
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}