import { Application } from 'egg'
import { ModelDefine } from './ModelDefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING, BIGINT } = Sequelize
    const model = ModelDefine(app, 'set', {
        name: {
            type: STRING(20),
            allowNull: false
        },
        exerciseID: BIGINT,
        data: Sequelize.JSON,
        date: BIGINT,
        user: Sequelize.STRING(20)
    })
    return model
}
