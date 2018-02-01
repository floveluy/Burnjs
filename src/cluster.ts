import { Burn } from './core';
import * as cluster from 'cluster';
import * as os from 'os';


export default class BurnCluster {
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
        } else {
            const app = new Burn;

            app.run();
        }
    }
}


