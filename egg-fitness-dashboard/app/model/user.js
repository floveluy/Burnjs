"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modeldefine_1 = require("./modeldefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING } = Sequelize;
    const user = modeldefine_1.ModelDefine(app, 'user', {
        userName: {
            type: STRING(20),
            unique: true,
            allowNull: false
        },
        passWord: {
            type: STRING(20),
            allowNull: false
        },
        token: STRING(128)
    });
    return user;
};
