const { Controller } = require('../../dist/base/controller');

class User extends Controller {
    index() {
        this.ctx.body = this.ctx.service.user.index();
    }
    parse() {

    }

}

module.exports = User;