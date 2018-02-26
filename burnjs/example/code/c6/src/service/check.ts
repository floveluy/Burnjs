import { BaseContext } from "koa";

class Service {
    ctx: BaseContext;
    constructor(ctx: BaseContext) {
        this.ctx = ctx;
    }
}

class check extends Service {
    index() {
        return 2 + 3;
    }
}

module.exports = check;