const { csvWriter } = require("../handlers/csvWriter.js")
const { ZMQObserver } = require("../ZMQObserver.js")

const zmqObserver = new ZMQObserver(
  process.env.PROTOCOL,
  process.env.ADDRESS,
  process.env.PORT,
  process.env.SAMPLE_RATE,
  ""
)

const observable$ = csvWriter(
  zmqObserver,
  process.env.FILE_PATH,
  `${new Date().getTime()}-${process.env.NAME}-${process.env.ID}`
)

process.on("SIGINT", () => {
  console.log("EXIT")
  observable$.unsubscribe()
  process.exit(0)
})
