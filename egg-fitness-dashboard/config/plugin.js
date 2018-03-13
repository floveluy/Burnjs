'use strict'
const path = require('path')
// had enabled by egg
// exports.static = true;

exports.blueprint = {
    enable: true,
    path: path.join(__dirname, '../app/lib/egg-blueprint')
}

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}

exports.jwt = {
    enable: true,
    package: 'egg-jwt'
}

exports.cors = {
    enable: true,
    package: 'egg-cors'
}

exports.static = {
    // maxAge: 31536000,
  };