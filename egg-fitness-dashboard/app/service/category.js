"use strict";
//home.ts
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class CategoryService extends egg_1.Service {
    async CurrentCategoryList(user) {
        const list = await this.ctx.model.Category.findAll({
            where: {
                user: user.userName
            }
        });
        return list;
    }
}
exports.default = CategoryService;
