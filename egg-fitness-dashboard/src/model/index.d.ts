import { Model, SequelizeStatic, Sequelize } from 'sequelize'

declare module 'egg' {
    interface Application {
        Sequelize: SequelizeStatic
        model: Sequelize
    }
    interface Context {
        model: {
            User: Model<{}, {}>
        }
    }
}
