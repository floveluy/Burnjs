"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDefine = (app, name, attributes) => {
    const { INTEGER } = app.Sequelize;
    const Model = app.model.define(name, Object.assign({ id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        } }, attributes), {
        timestamps: false
    });
    Model.sync({ force: true });
    return Model;
};
