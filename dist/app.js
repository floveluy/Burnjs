"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const app = new core_1.Burn;
app.run();
// const numCPUs = os.cpus().length;
// if (cluster.isMaster) {
//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', function (worker, code, signal) {
//         console.log('worker ' + worker.process.pid + ' died');
//     });
// } else {
//     const app = new Burn;
//     app.run();
// }
