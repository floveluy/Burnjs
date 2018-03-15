"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { BIGINT } = Sequelize;
    const model = ModelDefine_1.ModelDefine(app, 'set', {
        exerciseID: BIGINT,
        data: Sequelize.JSON,
        date: BIGINT,
        user: Sequelize.STRING(20)
    });
    return model;
};
