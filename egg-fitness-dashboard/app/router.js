"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    router.get('/', controller.home.index);
};
