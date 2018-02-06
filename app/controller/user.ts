import { Controller } from '../../src/base/controller';
import { bp } from '../../src/blueprint';

interface User {
    content: string
}


export default class user extends Controller {
    @bp.post('/uc')
    async index(body: User) {
        console.log(body.content);
        this.ctx.body = 'good routing'
    }

    

}
