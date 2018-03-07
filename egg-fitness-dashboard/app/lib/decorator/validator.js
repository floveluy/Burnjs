"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerializationHelper {
    static toInstance(obj, json) {
        for (var propName in json) {
            obj[propName] = json[propName];
        }
        return obj;
    }
}
function bodyValidator(obj) {
    return function (target, key, descriptor) {
        const originFun = descriptor.value;
        descriptor.value = function () {
            const body = SerializationHelper.toInstance(obj, this.ctx.request.body);
            originFun.call(this, body);
        };
    };
}
exports.bodyValidator = bodyValidator;
