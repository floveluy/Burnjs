import { Controller } from '../../src/base/controller';
import { bp } from '../../src/blueprint';

@bp.restfulClass('/haha')
export default class photo extends Controller {
    async index() {
        this.ctx.body = '123'
        this.ctx.redirect('/user');
        this.ctx.status = 301;
    }

    async Get() {
        this.ctx.body = this.app.config.database
    }

}


