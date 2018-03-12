//home.ts

import { Service } from 'egg'

interface AccountInfomation {
    userName: string
    password: string
}

export interface ResultBase {
    message: 'Success' | 'Fail'
    status: number
}

const DUPLICATE = 1062

export default class LoginService extends Service {
    async registerAccount(info: AccountInfomation): Promise<ResultBase> {
        try {
            await this.ctx.model.User.create({
                userName: info.userName,
                passWord: info.password
            })
            return {
                message: 'Success',
                status: 201
            }
        } catch (e) {
            if (e.parent.errno === DUPLICATE) {
                return {
                    message: 'Fail',
                    status: 409
                }
            } else {
                return {
                    message: 'Fail',
                    status: 500
                }
            }
        }
    }
}
