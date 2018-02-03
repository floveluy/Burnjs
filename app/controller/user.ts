import { Controller } from '../../src/base/controller';
import { bp } from '../../src/blueprint';


export default class user extends Controller {
    @bp.get('/uc')
    async index() {
        this.ctx.body = 'good routing'
    }

}
