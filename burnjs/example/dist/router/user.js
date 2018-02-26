"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//user.ts
const user = async (ctx, next) => {
    ctx.body = 'hello user';
};
const userInfo = async (ctx, next) => {
    ctx.body = 'hello userinfo';
};
exports.default = {
    'get /': user,
    'get /userinfo': userInfo
};
