import { ControllerBase } from './controller-base'
import {
    bodyValidator,
    Require,
    Require_Array
} from '../lib/decorator/validator'
import { Auth } from '../lib/decorator/auth'

export class ExerciseEntity {
    @Require type: string
    @Require name: string
}

class SetEntity {
    @Require name: string
    @Require_Array sets: string[]
    @Require date: string
    @Require exerciseID: number
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

        const top10List = await this.ctx.model.Exercise.findAll({
            where: {
                user: user.userName
            },
            attributes: ['id', 'type', 'name'],
            limit: 10
        })

        this.QuickSuccess({ exercise: top10List })
    }

    @ControllerBase.route.post('/exercise/set/create')
    @Auth
    @bodyValidator(SetEntity)
    async addSets(body: SetEntity) {
        const user = await this.CurrentUser()
        await this.ctx.model.Set.create({
            data: body.sets,
            date: body.date,
            user: user.userName,
            name: body.name,
            exerciseID: body.exerciseID
        })
        this.QuickSuccess({})
    }

    @ControllerBase.route.get('/exercise/history/:id')
    @Auth
    async ExerciseHistory() {
        const id = this.ctx.params.id
        const u = await this.CurrentUser()
        const history = await this.ctx.model.Set.findAll({
            where: {
                exerciseID: id,
                user: u.userName
            }
        })
        this.QuickSuccess({ history })
    }

    @ControllerBase.route.get('/exercise')
    @Auth
    async getExercise() {
        const u = await this.CurrentUser()

        try {
            const exercise = await this.ctx.model.Exercise.findAll({
                where: {
                    user: u.userName
                },
                attributes: ['id', 'type', 'name']
            })
            this.QuickSuccess({ exercise })
        } catch (e) {
            console.log(e)
        }
    }
}
