"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING, BIGINT } = Sequelize;
    const model = ModelDefine_1.ModelDefine(app, 'exercise', {
        type: {
            type: STRING(20),
            allowNull: false
        },
        name: {
            type: STRING(20),
            allowNull: false
        },
        categoryID: BIGINT,
        user: STRING(20)
    });
    return model;
};
