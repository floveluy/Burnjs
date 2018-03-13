"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_base_1 = require("./controller-base");
const auth_1 = require("../lib/decorator/auth");
const validator_1 = require("../lib/decorator/validator");
const category_1 = require("../model/category");
const exercise_1 = require("./exercise");
class ExerciseForBindEntity extends exercise_1.ExerciseEntity {
}
__decorate([
    validator_1.Require
], ExerciseForBindEntity.prototype, "categoryID", void 0);
__decorate([
    validator_1.Require
], ExerciseForBindEntity.prototype, "id", void 0);
class Category extends controller_base_1.ControllerBase {
    async createCategory(body) {
        const u = await this.CurrentUser();
        await this.ctx.model.Category.create({
            name: body.name,
            categoryID: body.categoryID,
            user: u.userName
        });
        this.QuickSuccess({});
    }
    async bindExerciseToCategory(body) {
        const u = await this.CurrentUser();
        this.ctx.model.Exercise.update({
            categoryID: body.categoryID
        }, {
            where: {
                user: u.userName,
                id: body.id
            }
        });
    }
}
__decorate([
    controller_base_1.ControllerBase.route.post('/category/create'),
    validator_1.bodyValidator(category_1.CategoryEntity),
    auth_1.Auth
], Category.prototype, "createCategory", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/category/bind'),
    validator_1.bodyValidator(ExerciseForBindEntity),
    auth_1.Auth
], Category.prototype, "bindExerciseToCategory", null);
exports.default = Category;
