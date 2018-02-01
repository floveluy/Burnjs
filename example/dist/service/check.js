"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(ctx, app) {
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
