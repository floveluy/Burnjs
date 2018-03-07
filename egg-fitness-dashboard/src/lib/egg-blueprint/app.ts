import { Application } from 'egg'
import { bp } from './index'
import { BaseContext } from 'koa'

module.exports = (app: Application) => {
    const { router } = app
    
    const r = bp.getRoute()
    Object.keys(r).forEach(url => {
        r[url].forEach(object => {
            ;(<any>router)[object.httpMethod](url, async (ctx: BaseContext) => {
                const instance = new object.constructor(ctx)
                await instance[object.handler](ctx.request.body)
            })
        })
    })
}
