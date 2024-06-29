// const cluster = require("cluster");
const express = require("express");
// this doesn't restrict the total number of therads
// in our entire cluster
// it means that every child of a cluster has 1 available
// thread only (can't use 4 threads through libuv)
process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const crypto = require('crypto');
const numCPUs = require('os').cpus().length;



if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers based on the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    //cluster.fork();
    // Handle worker exits
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Replace the worker that died
        cluster.fork();
    });
} else {
  const app = express();

  app.get("/fast", (req, res) => {
    res.status(200).json("hello from fast");
  });

  app.get("/", (req, res) => {
    crypto.pbkdf2('a', 'b', 20000, 512, 'sha512', (result) => {
        res.send('Hi there');
    });
  });

  app.listen(3001, () => {
    console.log(`Server is running ${process.pid}`);
  });
}

// ab -c 50 -n 50000 localhost:3000/fast

// try to make 50k request and 50 at the same time

// m2  start refactor.js -i 0
// let pm2 decides the number of instances based 
// on the number of logical threads
// and then start
// to kill it pm2 delete index
// pm2 list
// pm2 refactor
