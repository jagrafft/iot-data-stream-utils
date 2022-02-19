const { jsonWriter } = require("../handlers/jsonWriter.js")
const { ZMQObserver } = require("../ZMQObserver.js")

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
  `${new Date().getTime()}_${process.env.NAME}_${process.env.UUID}`
)

process.on("SIGINT", () => {
  console.log("EXIT")
  observable$.unsubscribe()
  process.exit(0)
})
