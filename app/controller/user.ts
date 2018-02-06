import { Controller } from '../../src/base/controller';
import { bp } from '../../src/blueprint';

interface User {
    content: string
}


export default class user extends Controller {
    @bp.get('/uc')
    async index(body: User) {
        this.ctx.body = 'good'
    }

    @bp.post('/pxt')
    async pxt(body: User) {
        this.ctx.body = JSON.stringify(body);
    }
}
