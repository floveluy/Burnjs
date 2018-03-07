"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING } = Sequelize;
    const food = ModelDefine_1.ModelDefine(app, 'user', {
        userName: STRING(20),
        passWord: STRING(20)
    });
    return food;
};
