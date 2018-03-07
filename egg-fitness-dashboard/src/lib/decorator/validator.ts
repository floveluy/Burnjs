export class SerializationHelper {
    static toInstance<T>(obj: any, json: any): T {
        const newObj = new obj()

        for (var propName in json) {
            newObj[propName] = json[propName]
        }
        return newObj
    }
}

export function bodyValidator<T>(obj: T) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const originFun = descriptor.value
        descriptor.value = async function() {
            try {
                const body = SerializationHelper.toInstance(
                    obj,
                    (<any>this).ctx.request.body
                )
                await originFun.call(this, body)
            } catch (e) {
                console.log(e)
                ;(<any>this).ctx.status = 400
            }
        }
    }
}

export function Require(target: any, key: string) {
    Object.defineProperty(target, key, {
        get() {
            if ((this as any).prop === void 666) {
                throw new Error(`没有${key}`)
            }
            return (this as any).prop
        },
        set(prop) {
            ;(this as any).prop = prop
        }
    })
}

export function log() {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value //被装饰的函数被保存在value中.
        descriptor.value = function() {
            //重写被装饰的函数
            console.log(`函数${key}()被访问了`)
            originFunction.apply(this, arguments)
        }
    }
}

