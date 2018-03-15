//home.ts

import { Service } from 'egg'
import { UserModel } from '../model/user'

export default class CategoryService extends Service {
    async CurrentCategoryList(user: UserModel) {
        const list = await this.ctx.model.Category.findAll({
            where: {
                user: user.userName
            }
        })
        return list
    }
}
