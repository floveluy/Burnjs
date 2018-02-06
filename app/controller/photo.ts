import { Controller } from '../../src/base/controller';
import { bp } from '../../src/blueprint';

@bp.restfulClass('/haha')
export default class photo extends Controller {
    async Get() {
        this.ctx.body = this.ctx.model.foo;

    }
}


