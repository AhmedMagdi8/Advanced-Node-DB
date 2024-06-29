const express = require("express");
const cluster = require('cluster');
const app = express();
const Worker = require('webworker-threads').Worker;


app.get("/fast", (req, res) => {
    // not using arrow function this would 
    // refer to the context of the wrapper handler
    const worker = new Worker(() => {
        this.onmessage = function() {

            let counter = 0;
            while(counter < 1e9) {
                counter++;
            }
            postMessage(counter);
        }
    });

    worker.onmessage = function(message) {
        console.log(message.data);
        res.json(message.data);
    }

    worker.postMessage();

    ///res.status(200).json("hello from fast");
  });
app.get("/", (req, res) => {
    crypto.pbkdf2('a', 'b', 20000, 512, 'sha512', (result) => {
        res.send('Hi there');
    });
});

app.listen(3001, () => {
    console.log(`Server is running ${process.pid}`);
});

