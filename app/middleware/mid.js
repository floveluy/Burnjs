exports.default = (options) => {
    return async function (ctx, next) {
        await next();
    }
}