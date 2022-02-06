/**
 * RxJS subscriber that prints to console
 *
 * @param {ZMQObserver} observer - ZMQ Observer to subscribe to
 * @param {boolean} [bytes=false] - Byte stream
 */
const consoleLogger = (observer, bytes=false) => {
  return observer
    .observable(bytes)                // Observable for ZMQ stream
    .subscribe({
      next(val) {
        console.log(val)
      },
      error(err) {
        console.error(err)
      },
      complete() {
        observer.unsubscribe()   // Unsubscribe from ZMQ topic
        observer.disconnect()    // Disconnect from ZMQ publisher
        console.log("Completed")
      }
    })
}

export {
  consoleLogger
}
