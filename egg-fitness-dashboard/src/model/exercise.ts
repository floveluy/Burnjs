import { Application } from 'egg'
import { ModelDefine } from './ModelDefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING } = Sequelize
    const model = ModelDefine(app, 'exercise', {
        type: {
            type: STRING(20),
            allowNull: false
        },
        name: {
            type: STRING(20),
            allowNull: false
        },
        data: Sequelize.JSON,
        user: Sequelize.STRING(20)
    })
    return model
}
