import { Application } from 'egg'
import { ModelDefine } from './ModelDefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING } = Sequelize
    const food = ModelDefine(app, 'user', {
        userName: STRING(20),
        passWord: STRING(20)
    })

    return food
}
