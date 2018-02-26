//home.ts

import { Service } from 'egg';

export default class HomeService extends Service {
    async addnumber(a: number, b: number) {
        return a + b;
    }
}

declare module 'egg' {
    export interface IService {
        home: HomeService;
    }
}