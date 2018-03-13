"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING, BIGINT } = Sequelize;
    const model = ModelDefine_1.ModelDefine(app, 'category', {
        categoryName: {
            type: STRING(20),
            allowNull: false
        },
        categoryID: BIGINT,
        user: Sequelize.STRING(20)
    });
    return model;
};
