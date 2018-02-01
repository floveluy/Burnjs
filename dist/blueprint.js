"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as  KoaRouter from 'koa-router';
const logger_1 = require("./logger");
// const methods = ['get', 'post', 'patch', 'del', 'options', 'put']
module.exports = class Blueprint {
    get(string) {
        return function (target, propertyKey, descriptor) {
            logger_1.default.blue({ target, propertyKey, descriptor });
        };
    }
};
