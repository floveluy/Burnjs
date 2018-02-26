import { BaseContext } from "koa";
import * as Koa from "koa";

class Service {
    ctx: BaseContext;
    app: Koa
    constructor(ctx: BaseContext, app: Koa) {
        this.ctx = ctx;
        this.app = app;
    }
}

class check extends Service {
    index() {
        return 2 + 3;
    }
}

module.exports = check;