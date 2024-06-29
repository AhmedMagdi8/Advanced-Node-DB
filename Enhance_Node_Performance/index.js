// const cluster = require("cluster");
const express = require("express");
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

function doWork(interval) {
  const now = Date.now();

  while (Date.now() - now < interval) {}
}


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers based on the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

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
    doWork(5000);
    console.log(process.pid);
    res.status(200).json("hello from root");
  });

  app.listen(3001, () => {
    console.log(`Server is running ${process.pid}`);
  });
}

// ab -c 50 -n 50000 localhost:3000/fast

// try to make 50k request and 50 at the same time


