import { Burn } from './core';
import * as cluster from 'cluster';
import * as os from 'os';
import { EventEmitter } from 'events';
import logger from './logger';


interface IPCMessage {
    action: string;
    data: any;
    from: string;
}


class Messager {
    master: BurnCluster;
    constructor(master: BurnCluster) {
        this.master = master;
    }

    sendToMaster(data: IPCMessage) {
        this.master.emit(data.action, data.data);
    }
    appSendToMaster(data: IPCMessage) {
        process.send && process.send(data);
    }

}

export default class BurnCluster extends EventEmitter {
    ip: string = '127.0.0.1';
    port: number = 3001;
    workersCount: number = 0;
    numCPUs: number = os.cpus().length;
    messager: Messager = new Messager(this);

    constructor() {
        super();
        this.on('app-worker-start', this.onAppStart.bind(this));
    }
    onAppStart() {
        logger.green(`[master]#${process.pid} burn app started ${this.ip}:${this.port}`);
    }
    onAppExit() {

    }

    forkWorkers() {
        const numCPUs = this.numCPUs;

        if (cluster.isMaster) {
            // Fork workers.

            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('fork', (worker) => {
                worker.on('message', (msg: IPCMessage) => {
                    if (msg.action === 'app-start') {
                        this.workersCount++;
                    }
                })
            })

            cluster.on('exit', function (worker, code, signal) {
                logger.error(`worker ${+ worker.process.pid} died`);

                cluster.fork();
            });

            cluster.on('disconnect', function (worker) {
                logger.error(`worker ${+ worker.process.pid} disconnect`);
            })

            cluster.on('listening', (worker, address) => {
                logger.blue(`[worker]#${worker.process.pid} start listening ${address.address}:${address.port}`);
                if (this.workersCount === this.numCPUs) {
                    this.messager.sendToMaster({ action: 'app-worker-start', data: '', from: worker.process.pid + '' })
                }
            });


        } else {
            const app = new Burn;
            app.run(() => { }, this.port, this.ip);
            this.messager.appSendToMaster({
                action: 'app-start',
                data: { pid: process.pid },
                from: 'app'
            })
        }
    }


    startCluster() {
        this.forkWorkers();
    }
}


