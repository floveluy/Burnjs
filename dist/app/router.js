"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller } = app;
    return {
        'get /': controller.user.index
    };
};
