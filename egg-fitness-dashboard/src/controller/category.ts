import { ControllerBase } from '../controller/controller-base'
import { Auth } from '../lib/decorator/auth'
import { bodyValidator, Require } from '../lib/decorator/validator'

class CategoryEntity {
    @Require categoryName: string
    @Require categoryID: number
}

class CategoryForDelete {
    @Require categoryID: number
}

class BindCategoryEntity {
    @Require categoryID: number
    @Require exerciseID: number
}

export default class Category extends ControllerBase {
    @ControllerBase.route.get('/category')
    @Auth
    async getCategory() {
        const u = await this.CurrentUser()
        try {
            const list = await this.ctx.model.Category.findAll({
                where: {
                    user: u.userName
                }
            })

            this.QuickSuccess({ category: list })
        } catch (e) {
            console.log(e)
        }
    }

    @ControllerBase.route.post('/category/create')
    @bodyValidator(CategoryEntity)
    @Auth
    async createCategory(body: CategoryEntity) {
        const u = await this.CurrentUser()
        await this.ctx.model.Category.create({
            categoryName: body.categoryName,
            user: u.userName,
            categoryID: body.categoryID
        })
        this.QuickSuccess({})
    }

    @ControllerBase.route.post('/category/delete')
    @Auth
    @bodyValidator(CategoryForDelete)
    async deleteCategory(body: CategoryForDelete) {
        const u = await this.CurrentUser()
        await this.ctx.model.Category.destroy({
            where: {
                user: u.userName,
                categoryID: body.categoryID
            }
        })
        await this.ctx.model.Exercise.update(
            {
                categoryID: null
            },
            {
                where: {
                    user: u.userName
                }
            }
        )

        const list = await this.ctx.model.Category.findAll({
            where: {
                user: u.userName
            }
        })
        this.QuickSuccess({ category: list })
    }

    @ControllerBase.route.post('/category/bind')
    @bodyValidator(CategoryEntity)
    @Auth
    async bindCategory(body: BindCategoryEntity) {
        const u = await this.CurrentUser()
        await this.ctx.model.Exercise.update(
            {
                categoryID: body.categoryID
            },
            {
                where: {
                    user: u.userName,
                    id: body.exerciseID
                }
            }
        )
        this.QuickSuccess({})
    }

    @ControllerBase.route.get('/category/exercise/:id')
    @bodyValidator(CategoryEntity)
    @Auth
    async getExerciseByCategoryID() {
        const cateid = this.ctx.params.id
        const u = await this.CurrentUser()
        const list = await this.ctx.model.Exercise.findAll({
            where: {
                categoryID: cateid,
                user: u.userName
            }
        })
        this.QuickSuccess({ exercise: list })
    }
}
