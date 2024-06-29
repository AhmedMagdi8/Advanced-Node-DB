// example to close events

const { ReadStream } = require("fs");

ReadStream.on('close', () => {
    console.log('Cleanup code');
});




