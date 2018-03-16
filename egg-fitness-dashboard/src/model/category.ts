import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING, BIGINT } = Sequelize
    const model = ModelDefine(app, 'category', {
        categoryName: {
            type: STRING(20),
            allowNull: false
        },
        categoryID: BIGINT,
        user: Sequelize.STRING(20)
    })

    return model
}

export interface CategoryModel {
    categoryName: string
    categoryID: number
    user: string
}
