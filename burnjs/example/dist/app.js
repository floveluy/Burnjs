"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//app.js
const Koa = require("koa");
const loader_1 = require("./loader");
const app = new Koa;
const loader = new loader_1.Loader(app);
app.use(loader.loadRouter());
app.listen(3000, '127.0.0.1', () => {
    console.log('服务器在运行');
});
