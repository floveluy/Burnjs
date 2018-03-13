import { ControllerBase } from '../controller/controller-base'

export default class Category extends ControllerBase {
    @ControllerBase.route.post('/category/create')
    async createCategory() {}
}
