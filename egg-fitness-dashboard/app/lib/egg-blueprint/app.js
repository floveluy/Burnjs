"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
module.exports = (app) => {
    const { router } = app;
    const r = index_1.bp.getRoute();
    Object.keys(r).forEach(url => {
        r[url].forEach(object => {
            ;
            router[object.httpMethod](url, async (ctx) => {
                const instance = new object.constructor(ctx);
                await instance[object.handler](ctx.request.body);
            });
        });
    });
};
