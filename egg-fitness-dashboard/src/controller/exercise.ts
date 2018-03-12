import { ControllerBase } from './controller-base'
import { bodyValidator, Require } from '../lib/decorator/validator'
import { Auth } from '../lib/decorator/auth'

class ExerciseEntity {
    @Require type: string
    @Require name: string
}

class SetEntity {
    @Require name: string
    @Require sets: string
}

export default class Exercise extends ControllerBase {
    @ControllerBase.route.post('/exercise/create')
    @bodyValidator(ExerciseEntity)
    @Auth
    async createExercise(body: ExerciseEntity) {
        const user = await this.CurrentUser()
        await this.ctx.model.Exercise.create({
            type: body.type,
            name: body.name,
            user: user.userName
        })
        this.QuickSuccess({})
    }

    @ControllerBase.route.put('/exercise/create')
    @bodyValidator(SetEntity)
    @Auth
    async addSets(body: SetEntity) {
        const user = await this.CurrentUser()
        await this.ctx.model.Exercise.update(
            {
                data: body.sets
            },
            {
                where: {
                    user: user.userName
                }
            }
        )
        this.QuickSuccess({})
    }

    @ControllerBase.route.get('/exercise')
    @Auth
    async getExercise() {
        const u = await this.CurrentUser()
        const exercise = await this.ctx.model.Exercise.findAll({
            where: {
                user: u.userName
            },
            attributes: ['id', 'type', 'name', 'data']
        })
        this.QuickSuccess({ exercise })
    }
}
