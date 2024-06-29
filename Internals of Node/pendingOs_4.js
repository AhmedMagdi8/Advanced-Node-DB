const https = require('https');


const start = Date.now();

function doRequest () {

    https
    .request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log(Date.now() - start);
        })

    })
    .end();

}


doRequest()
doRequest()
doRequest()
doRequest()
doRequest()

// all of them completed on the same time


// libuv has also functions allows you to delegate netwrok requests making to 
// underlying operating system so my os is actually who makes the request
// libuv issues request and wait the os to emit a signal that some response
// has come
// no blocking of event loop os handles everything for us