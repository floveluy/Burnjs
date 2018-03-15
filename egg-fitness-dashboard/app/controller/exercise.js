"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_base_1 = require("./controller-base");
const validator_1 = require("../lib/decorator/validator");
const auth_1 = require("../lib/decorator/auth");
class ExerciseEntity {
}
__decorate([
    validator_1.Require
], ExerciseEntity.prototype, "type", void 0);
__decorate([
    validator_1.Require
], ExerciseEntity.prototype, "name", void 0);
exports.ExerciseEntity = ExerciseEntity;
class SetEntity {
}
__decorate([
    validator_1.Require_Array
], SetEntity.prototype, "sets", void 0);
__decorate([
    validator_1.Require
], SetEntity.prototype, "date", void 0);
__decorate([
    validator_1.Require
], SetEntity.prototype, "exerciseID", void 0);
class HistoryDeleteEntity {
}
__decorate([
    validator_1.Require
], HistoryDeleteEntity.prototype, "date", void 0);
__decorate([
    validator_1.Require
], HistoryDeleteEntity.prototype, "exerciseID", void 0);
class Exercise extends controller_base_1.ControllerBase {
    async createExercise(body) {
        const user = await this.CurrentUser();
        await this.ctx.model.Exercise.create({
            type: body.type,
            name: body.name,
            user: user.userName,
            categoryID: null
        });
        const top10List = await this.ctx.model.Exercise.findAll({
            where: {
                user: user.userName
            },
            attributes: ['id', 'type', 'name'],
            limit: 10
        });
        this.QuickSuccess({ exercise: top10List });
    }
    async deleteExercise() {
        console.log('到这里');
        const user = await this.CurrentUser();
        const id = this.ctx.params.id;
        await this.ctx.model.Exercise.destroy({
            where: {
                id: id,
                user: user.userName
            }
        });
        await this.ctx.model.Set.destroy({
            where: {
                user: user.userName,
                exerciseID: id
            }
        });
        const exercise = await this.ctx.model.Exercise.findAll({
            where: {
                user: user.userName
            },
            attributes: ['id', 'type', 'name', 'categoryID']
        });
        this.QuickSuccess({ exercise });
    }
    async addSets(body) {
        const user = await this.CurrentUser();
        await this.ctx.model.Set.create({
            data: body.sets,
            date: body.date,
            user: user.userName,
            exerciseID: body.exerciseID
        });
        this.QuickSuccess({});
    }
    async ExerciseHistory() {
        const id = this.ctx.params.id;
        const u = await this.CurrentUser();
        const history = await this.ctx.model.Set.findAll({
            where: {
                exerciseID: id,
                user: u.userName
            },
            order: [['date', 'DESC']]
        });
        this.QuickSuccess({ history });
    }
    async deleteHistory(body) {
        const u = await this.CurrentUser();
        await this.ctx.model.Set.destroy({
            where: {
                user: u.userName,
                exerciseID: body.exerciseID,
                date: body.date
            }
        });
        const history = await this.ctx.model.Set.findAll({
            where: {
                exerciseID: body.exerciseID,
                user: u.userName
            },
            order: [['date', 'DESC']]
        });
        this.QuickSuccess({ history });
    }
    async getExercise() {
        const u = await this.CurrentUser();
        try {
            const exercise = await this.ctx.model.Exercise.findAll({
                where: {
                    user: u.userName
                },
                attributes: ['id', 'type', 'name', 'categoryID']
            });
            this.QuickSuccess({ exercise });
        }
        catch (e) {
            console.log(e);
        }
    }
}
__decorate([
    controller_base_1.ControllerBase.route.post('/exercise/create'),
    auth_1.Auth,
    validator_1.bodyValidator(ExerciseEntity)
], Exercise.prototype, "createExercise", null);
__decorate([
    controller_base_1.ControllerBase.route.get('/exercise/delete/:id'),
    auth_1.Auth
], Exercise.prototype, "deleteExercise", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/exercise/set/create'),
    auth_1.Auth,
    validator_1.bodyValidator(SetEntity)
], Exercise.prototype, "addSets", null);
__decorate([
    controller_base_1.ControllerBase.route.get('/exercise/history/:id'),
    auth_1.Auth
], Exercise.prototype, "ExerciseHistory", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/exercise/history/delete'),
    auth_1.Auth,
    validator_1.bodyValidator(HistoryDeleteEntity)
], Exercise.prototype, "deleteHistory", null);
__decorate([
    controller_base_1.ControllerBase.route.get('/exercise'),
    auth_1.Auth
], Exercise.prototype, "getExercise", null);
exports.default = Exercise;
