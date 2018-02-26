import { Controller } from "./base";
import { bp } from "../blueprint";

//user.ts

export default class User extends Controller {
    async user() {
        this.ctx.body = this.ctx.service.check.index();

    }

    getConfig() {
        return (<any>this.app)['config']
    }

    @bp.get('/test')
    async userInfo() {
        this.ctx.body = '我是装饰器';
    }
}