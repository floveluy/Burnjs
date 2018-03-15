import { Model, SequelizeStatic, Sequelize } from 'sequelize'
import { SetsModel } from './set'
import { UserModel } from './user'
import { ExerciseModel } from './exercise'
import { CategoryModel } from './category'

declare module 'egg' {
    interface Application {
        Sequelize: SequelizeStatic
        model: Sequelize
    }
    interface Context {
        model: {
            User: Model<UserModel, {}>
            Exercise: Model<ExerciseModel, {}>
            Category: Model<CategoryModel, {}>
            Set: Model<SetsModel, {}>
        }
    }
}
