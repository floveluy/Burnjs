const { Service } = require('../../dist/base/service');


class user extends Service {
    index() {
        return 2 + 3;
    }
}

module.exports = user;