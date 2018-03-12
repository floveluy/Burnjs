"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING } = Sequelize;
    const model = ModelDefine_1.ModelDefine(app, 'set', {
        name: {
            type: STRING(20),
            allowNull: false
        },
        data: Sequelize.JSON,
        date: STRING(20),
        user: Sequelize.STRING(20)
    });
    return model;
};
