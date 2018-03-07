import { Application } from 'egg'
import { ModelDefine } from './ModelDefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING } = Sequelize
    const user = ModelDefine(app, 'user', {
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
    })
    // user.sync({ force: true })

    return user
}
