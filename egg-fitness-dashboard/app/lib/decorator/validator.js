"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerializationHelper {
    static toInstance(obj, json) {
        const newObj = new obj();
        for (var propName in json) {
            newObj[propName] = json[propName];
        }
        return newObj;
    }
}
exports.SerializationHelper = SerializationHelper;
function bodyValidator(obj) {
    return function (target, key, descriptor) {
        const originFun = descriptor.value;
        descriptor.value = async function () {
            try {
                const body = SerializationHelper.toInstance(obj, this.ctx.request.body);
                await originFun.call(this, body);
            }
            catch (e) {
                ;
                this.QuickFail(e.message);
                this.ctx.status = 400;
            }
        };
    };
}
exports.bodyValidator = bodyValidator;
function Require(target, key) {
    Object.defineProperty(target, key, {
        get() {
            if (this.Property[key] === void 666) {
                throw new Error(`没有${key}`);
            }
            return this.Property[key];
        },
        set(prop) {
            if (this.Property === void 666) {
                ;
                this.Property = {};
            }
            ;
            this.Property[key] = prop;
        }
    });
}
exports.Require = Require;
function log() {
    return function (target, key, descriptor) {
        const originFunction = descriptor.value; //被装饰的函数被保存在value中.
        descriptor.value = function () {
            //重写被装饰的函数
            console.log(`函数${key}()被访问了`);
            originFunction.apply(this, arguments);
        };
    };
}
exports.log = log;
