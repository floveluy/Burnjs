import { Model, SequelizeStatic, Sequelize } from 'sequelize'

declare module 'egg' {
    interface Application {
        Sequelize: SequelizeStatic
        model: Sequelize
    }
    interface Context {
        model: {
            User: Model<{ userName: string; passWord: string; id: number }, {}>
            Exercise: Model<
                { type: string; name: string; data: any; user: string },
                {}
            >
            Category: Model<
                { categoryName: string; user: string; categoryID: number },
                { categoryName: string; user: string; categoryID: number }
            >
            Set: Model<
                {
                    name: string
                    data: any
                    user: string
                    id: number
                },
                {}
            >
        }
    }
}
