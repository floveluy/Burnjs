"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_base_1 = require("../controller/controller-base");
const auth_1 = require("../lib/decorator/auth");
const validator_1 = require("../lib/decorator/validator");
class CategoryEntity {
}
__decorate([
    validator_1.Require
], CategoryEntity.prototype, "categoryName", void 0);
__decorate([
    validator_1.Require
], CategoryEntity.prototype, "categoryID", void 0);
class CategoryForDelete {
}
__decorate([
    validator_1.Require
], CategoryForDelete.prototype, "categoryID", void 0);
class BindCategoryEntity {
}
__decorate([
    validator_1.Require
], BindCategoryEntity.prototype, "categoryID", void 0);
__decorate([
    validator_1.Require
], BindCategoryEntity.prototype, "exerciseID", void 0);
class Category extends controller_base_1.ControllerBase {
    async getCategory() {
        const u = await this.CurrentUser();
        try {
            const list = await this.ctx.model.Category.findAll({
                where: {
                    user: u.userName
                }
            });
            this.QuickSuccess({ category: list });
        }
        catch (e) {
            console.log(e);
        }
    }
    async createCategory(body) {
        const u = await this.CurrentUser();
        await this.ctx.model.Category.create({
            categoryName: body.categoryName,
            user: u.userName,
            categoryID: body.categoryID
        });
        this.QuickSuccess({});
    }
    async deleteCategory(body) {
        const u = await this.CurrentUser();
        await this.ctx.model.Category.destroy({
            where: {
                user: u.userName,
                categoryID: body.categoryID
            }
        });
        await this.ctx.model.Exercise.update({
            categoryID: null
        }, {
            where: {
                user: u.userName
            }
        });
        const list = await this.ctx.model.Category.findAll({
            where: {
                user: u.userName
            }
        });
        this.QuickSuccess({ category: list });
    }
    async bindCategory(body) {
        const u = await this.CurrentUser();
        await this.ctx.model.Exercise.update({
            categoryID: body.categoryID
        }, {
            where: {
                user: u.userName,
                id: body.exerciseID
            }
        });
        this.QuickSuccess({});
    }
    async getExerciseByCategoryID() {
        const cateid = this.ctx.params.id;
        const u = await this.CurrentUser();
        const list = await this.ctx.model.Exercise.findAll({
            where: {
                categoryID: cateid,
                user: u.userName
            }
        });
        this.QuickSuccess({ exercise: list });
    }
}
__decorate([
    controller_base_1.ControllerBase.route.get('/category'),
    auth_1.Auth
], Category.prototype, "getCategory", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/category/create'),
    validator_1.bodyValidator(CategoryEntity),
    auth_1.Auth
], Category.prototype, "createCategory", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/category/delete'),
    auth_1.Auth,
    validator_1.bodyValidator(CategoryForDelete)
], Category.prototype, "deleteCategory", null);
__decorate([
    controller_base_1.ControllerBase.route.post('/category/bind'),
    validator_1.bodyValidator(CategoryEntity),
    auth_1.Auth
], Category.prototype, "bindCategory", null);
__decorate([
    controller_base_1.ControllerBase.route.get('/category/exercise/:id'),
    validator_1.bodyValidator(CategoryEntity),
    auth_1.Auth
], Category.prototype, "getExerciseByCategoryID", null);
exports.default = Category;
