import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { BIGINT } = Sequelize
    const model = ModelDefine(app, 'set', {
        exerciseID: BIGINT,
        data: Sequelize.JSON,
        date: BIGINT,
        user: Sequelize.STRING(20)
    })

    return model
}

export interface SetsModel {
    name: string
    exerciseID: number
    data: any
    date: number
    user: string
}
