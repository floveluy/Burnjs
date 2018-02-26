/// <reference types="node" />
import * as Application from './src/core'
import { BaseContext, Request, Response } from 'koa';
import { blueprint } from './src/blueprint';

interface FService { }
interface FController { }
interface FConfig { }

declare module "koa" {
    export interface BaseContext {
        service: FService;
        request: Request;
        response: Response
    }
}


export class Burn extends Application.Burn {

    controller: FController
    config: FConfig;
}



export class Controller extends Application.Burn.Controller {

    app: Burn;
}



export class Service extends Application.Burn.Service {

    app: Burn;
}


export const Blueprint: blueprint;


export as namespace Burn