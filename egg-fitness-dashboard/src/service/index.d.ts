import loginService from './login'

declare module 'egg' {
    export interface IService {
        login: loginService
    }
}
