// import * as  KoaRouter from 'koa-router';
import logger from './logger';

// const methods = ['get', 'post', 'patch', 'del', 'options', 'put']

module.exports = class Blueprint {

    get(string: string) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            logger.blue({ target, propertyKey, descriptor })
        }
    }
}