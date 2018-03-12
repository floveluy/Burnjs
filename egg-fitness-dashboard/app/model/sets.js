"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING } = Sequelize;
    const model = ModelDefine_1.ModelDefine(app, 'set', {
        type: {
            type: STRING(20),
            allowNull: false
        },
        name: {
            type: STRING(20),
            allowNull: false
        },
        user: Sequelize.STRING(20)
    });
    return model;
};
