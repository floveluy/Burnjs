"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const cluster = require("cluster");
const os = require("os");
class BurnCluster {
    startCluster() {
        const numCPUs = os.cpus().length;
        if (cluster.isMaster) {
            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('online', function (worker) {
                console.log('worker ' + worker.process.pid + ' start');
            });
            cluster.on('exit', function (worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died');
                cluster.fork();
            });
            cluster.on('disconnect', function (worker) {
                if (worker.isDead) {
                    console.log('工作进程 #' + worker.id + ' 已经死亡');
                }
                console.log('工作进程 #' + worker.id + ' 断开了连接');
            });
        }
        else {
            const app = new core_1.Burn;
            app.run();
        }
    }
}
exports.default = BurnCluster;
