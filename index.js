const Burn = require('./dist/core').Burn;
const Controller = require('./dist/base/controller').Controller;
const Service = require('./dist/base/service').Service;


Burn.Controller = Controller;
Burn.Service = Service;

module.exports = Burn;