const { createWriteStream } = require("fs")
const { finalize, tap } = require("rxjs/operators")

/**
 * RxJS subscriber that writes JSON to a local file
 *
 * @param {ZMQObserver} observer - ZMQ Observer to subscribe to
 * @param {string} path - File path
 * @param (string) name - File name
 */
const jsonWriter = (observer, path, name) => {
  const writeStream = createWriteStream(`${path}/${name}.json`, {
    "flags": "wx",
    "encoding": "utf8",
    "autoclose": true
  })

  // Observable stream, needed to close file correctly
  const observer$ = observer
        .observable()
        .pipe(
          finalize((val) => {
            // "Tail" entry of JSON file: `...]`
            writeStream.write("]")
            writeStream.end()
          }),
          tap((val) => JSON.parse(val),
            (err) => err,
            () => "COMPLETED"
          )
        )

  // TODO Improve strategy for inserting comma separator
  let firstWrite = true

  return observer$.subscribe({
    next(json) {
      if (firstWrite) {
        // "Head" entry of JSON file: `[...`
        writeStream.write("[")
        firstWrite = false
      } else {
        // PREPEND comma
        writeStream.write(",")
      }

      // write JSON string
      writeStream.write(json)
    },
    error(err) {
      console.error(err)
    },
    complete(msg) {
      console.log(msg)
    }
  })
}

module.exports = {
  jsonWriter
}
