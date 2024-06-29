
const pendingTimers = []
const pendingOSTasks = []
const pendingOperations = []

// new Timers, tasks , operations are recorded from myFile running
// myFile.runContents()

function shouldContinue() {
  // check One: any pending setTimeout, setInterval, setImmediate?
  // 2: any pending OS tasks like http server listening to request on some port
  // 3: any pending long running operations like fs module
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}



// Entire body excutes in one 'tick' what's heppening in every single tick
while(shouldContinue()) {
    // 1 - Node looks at pendingTimers and sees if any funcitons
    // are ready to be called setTimeout, setInterval

    // 2 - Node looks at pendingOSTasks and pendingOperations
    // and calls relevant callbacks

    // 3 - pause execution and Continue when ...
    // - a new pendingOSTasks is done
    // - a new pendingOperations is done
    // - a timer is about to complete


    // 4 - Look at pendingTimers. call any setImmediate 

    // 5 - handle any 'close' interval
      
}



// Node event loop -----> single threaded