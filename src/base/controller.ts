import { Burn } from "../core";
import { BaseContext } from "koa";


export class Controller {
    ctx: BaseContext;
    app: Burn;
    constructor(ctx: BaseContext, app: Burn) {
        this.ctx = ctx;
        this.app = app;
    }
}

