import loginService from './login'
import CategoryService from './category';

declare module 'egg' {
    export interface IService {
        login: loginService
        category: CategoryService
    }
}
