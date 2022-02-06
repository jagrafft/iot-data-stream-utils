import { jsonWriter } from "../src/handlers/jsonWriter.js"
import { ZMQObserver } from "../src/ZMQObserver.js"

const SAMPLE_WINDOW_MS = 7436

// ZMQ endpoint on IoT device
//const bno055 = new ZMQObserver("tcp", "192.168.39.188", 17171, 1/20, "")
const bno055 = new ZMQObserver("tcp", "192.168.39.200", 17171, 1/20, "")

// Initiate jsonWriter Observable
const jsonWriter$ = jsonWriter(bno055, "/home/jg", "w00t")

// Capture data for fixed time window then unsubscribe from Observable
setTimeout(() => {
  console.log(`Timed out. Disconnecting from ${bno055.urlPath()}`)

  jsonWriter$.unsubscribe()
  process.exit(0)
}, SAMPLE_WINDOW_MS)
