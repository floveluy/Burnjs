/// <reference types="node" />
import { Burn } from './src/core'
import { BaseContext } from 'koa';

declare module "koa" {
    interface BaseContext {
        service: any;
    }

}

export default Burn;