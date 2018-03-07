"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const { STRING } = Sequelize;
    const user = ModelDefine_1.ModelDefine(app, 'user', {
        userName: {
            type: STRING(20),
            unique: true,
            allowNull: false
        },
        passWord: {
            type: STRING(20),
            allowNull: false
        },
        token: STRING(20)
    });
    // user.sync({ force: true })
    return user;
};
