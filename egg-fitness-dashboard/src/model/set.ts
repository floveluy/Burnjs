import { Application } from 'egg'
import { ModelDefine } from './ModelDefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING } = Sequelize
    const model = ModelDefine(app, 'set', {
        name: {
            type: STRING(20),
            allowNull: false
        },
        data: Sequelize.JSON,
        date: STRING(20),
        user: Sequelize.STRING(20)
    })

    return model
}
