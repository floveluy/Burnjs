"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modeldefine_1 = require("./modeldefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { BIGINT } = Sequelize;
    const model = modeldefine_1.ModelDefine(app, 'set', {
        exerciseID: BIGINT,
        data: Sequelize.JSON,
        date: BIGINT,
        user: Sequelize.STRING(20)
    });
    return model;
};
