"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const cluster = require("cluster");
const os = require("os");
const events_1 = require("events");
const logger_1 = require("./logger");
class Messager {
    constructor(master) {
        this.master = master;
    }
    sendToMaster(data) {
        this.master.emit(data.action, data.data);
    }
    appSendToMaster(data) {
        process.send && process.send(data);
    }
}
class BurnCluster extends events_1.EventEmitter {
    constructor() {
        super();
        this.ip = '127.0.0.1';
        this.port = 3001;
        this.workersCount = 0;
        this.numCPUs = os.cpus().length;
        this.messager = new Messager(this);
        this.on('app-worker-start', this.onAppStart.bind(this));
    }
    onAppStart() {
        logger_1.default.green(`[master]#${process.pid} burn app started ${this.ip}:${this.port}`);
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
                worker.on('message', (msg) => {
                    if (msg.action === 'app-start') {
                        this.workersCount++;
                    }
                });
            });
            cluster.on('exit', function (worker, code, signal) {
                logger_1.default.error(`worker ${+worker.process.pid} died`);
                cluster.fork();
            });
            cluster.on('disconnect', function (worker) {
                logger_1.default.error(`worker ${+worker.process.pid} disconnect`);
            });
            cluster.on('listening', (worker, address) => {
                logger_1.default.blue(`[worker]#${worker.process.pid} start listening ${address.address}:${address.port}`);
                if (this.workersCount === this.numCPUs) {
                    this.messager.sendToMaster({ action: 'app-worker-start', data: '', from: worker.process.pid + '' });
                }
            });
        }
        else {
            const app = new core_1.Burn;
            app.run(() => { }, this.port, this.ip);
            this.messager.appSendToMaster({
                action: 'app-start',
                data: { pid: process.pid },
                from: 'app'
            });
        }
    }
    startCluster() {
        this.forkWorkers();
    }
}
exports.default = BurnCluster;
