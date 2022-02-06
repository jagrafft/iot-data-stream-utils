import { consoleLogger } from "../src/handlers/consoleLogger.js"
import { ZMQObserver } from "../src/ZMQObserver.js"

const SAMPLE_WINDOW_MS = 3500

// ZMQ endpoint on IoT device
//const bno055 = new ZMQObserver("tcp", "192.168.39.188", 17171, 1/20, "")
const bno055 = new ZMQObserver("tcp", "192.168.39.200", 17171, 1/20, "")

// Initiate consoleLogger Observable
const consoleLogger$ = consoleLogger(bno055, false) // true for byte stream

// Print data to console for fixed time window then unsubscribe from Observable
setTimeout(() => {
  console.log(`Timed out. Disconnecting from ${bno055.urlPath()}`)

  consoleLogger$.unsubscribe()
  process.exit(0)
}, SAMPLE_WINDOW_MS)
