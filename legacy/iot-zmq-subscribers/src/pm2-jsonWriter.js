import {
  jsonWriter
} from "./handlers/jsonWriter.js"

import {
  ZMQObserver
} from "./ZMQObserver.js"

const zmqObserver = new ZMQObserver(
  process.env.PROTOCOL,
  process.env.ADDRESS,
  process.env.PORT,
  process.env.SAMPLE_RATE,
  ""
)

const observable$ = jsonWriter(
  zmqObserver,
  process.env.FILE_PATH,
  `${new Date().getTime()}-${process.env.NAME}`
)

process.on("SIGINT", () => {
  console.log("EXIT")
  observable$.unsubscribe()
  process.exit(0)
})
