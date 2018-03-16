import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING, BIGINT } = Sequelize
    const model = ModelDefine(app, 'exercise', {
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
    })

    return model
}

export interface ExerciseModel {
    type: string
    name: string
    categoryID: number
    user: string
}
