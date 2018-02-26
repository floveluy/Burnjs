import { Controller } from "./base";

//user.ts

export default class User extends Controller {
    async user() {
        this.ctx.body = this.ctx.service.check.index();

    }

    getConfig() {
        return (<any>this.app)['config']
    }

    async userInfo() {
        this.ctx.body = this.getConfig().middleware[0];
    }
}