import { Application } from 'egg'
import { DefineAttributes } from 'sequelize'

export const ModelDefine = (
    app: Application,
    name: string,
    attributes: DefineAttributes
) => {
    const { INTEGER } = app.Sequelize
    const Model = app.model.define(
        name,
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            ...attributes
        },
        {
            timestamps: false
        }
    )
    Model.sync({force:true})
    return Model
}

export interface BaseModel {
    id?: number
}
