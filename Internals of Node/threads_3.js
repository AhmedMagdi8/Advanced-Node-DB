// UPDATE Threadpool size --- default 4 -- changing the threadpool size
// doesn't work directly on windows
process.env.UV_THREADPOOL_SIZE=5;

// if i choose numbe bigger than 4 
// it will split work of 5th thread between two cores 
// and calculate them at the same time

// all fs modules uses threadpool , some crypto stull depends on OS (windows vs unix based)

// Tasks running in the threadpool are the pendingOperations in our code example

// libuv uses threadool to run computational intensive tasks outside the event loop
const crypto = require('crypto');


const start = Date.now()

crypto.pbkdf2('a','b', 100000, 1000 , 'sha512',() => {
      console.log('1:', Date.now() - start);
});


crypto.pbkdf2('a','b', 100000, 1000 , 'sha512',() => {
    console.log('2:', Date.now() - start);
});


crypto.pbkdf2('a','b', 100000, 1000 , 'sha512',() => {
    console.log('3:', Date.now() - start);
});


crypto.pbkdf2('a','b', 100000, 1000 , 'sha512',() => {
    console.log('4:', Date.now() - start);
});


crypto.pbkdf2('a','b', 100000, 1000 , 'sha512',() => {
    console.log('5:', Date.now() - start);
});
