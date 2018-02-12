"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = require("../src/cluster");
const cl = new cluster_1.default();
cl.startCluster();
