const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest () {

    https
    .request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log('http: ',Date.now() - start);
        })

    })
    .end();

}

function doHash() {
  crypto.pbkdf2('a','b', 100000, 1000 , 'sha512',() => {
        console.log('Hash:', Date.now() - start);
  });
  
}

//doRequest();

fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS', Date.now() - start);
})


doHash();
doHash();
doHash();
doHash();


/// https excutes first as os handles the request
// fs is the same as hash
// fs need time so it excutes first hash then waits for fs to callback info
// and continue on other thread 
