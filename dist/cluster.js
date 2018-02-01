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
            cluster.on('exit', function (worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died');
            });
        }
        else {
            const app = new core_1.Burn;
            app.run();
        }
    }
}
exports.default = BurnCluster;
