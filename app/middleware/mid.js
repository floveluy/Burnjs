module.exports = (options) => {
    return async function (ctx, next) {
        await next();
    }
}