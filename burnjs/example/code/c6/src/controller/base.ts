//base.ts
import { BaseContext } from "koa";

export class Controller {
    ctx: BaseContext;
    constructor(ctx: BaseContext) {
        this.ctx = ctx;
    }
}