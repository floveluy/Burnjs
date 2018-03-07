class SerializationHelper {
    static toInstance<T>(obj: any, json: any): T {
        for (var propName in json) {
            obj[propName] = json[propName]
        }
        return obj
    }
}

export function bodyValidator<T>(obj: T) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const originFun = descriptor.value
        descriptor.value = function() {
            const body = SerializationHelper.toInstance(
                obj,
                (<any>this).ctx.request.body
            )
            originFun.call(this, body)
        }
    }
}
