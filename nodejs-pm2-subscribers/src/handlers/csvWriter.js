import { createWriteStream } from "fs"
import { finalize, tap } from "rxjs/operators"

/**
 * RxJS subscriber that writes CSV to a local file
 *
 * @param {ZMQObserver} observer - ZMQ Observer to subscribe to
 * @param {string} path - File path
 * @param (string) name - File name
 * @param (string) [sepChar] - Character to use as separator
 */
const csvWriter = (observer, path, name, sepChar=",") => {
  const writeStream = createWriteStream(`${path}/${name}.csv`, {
    "flags": "wx",
    "encoding": "utf8",
    "autoclose": true
  })

  // Observable stream, needed to close file correctly
  const observer$ = observer
        .observable()
        .pipe(
          finalize((val) => {
            writeStream.end()
          }),
          tap((val) => CSV.parse(val),
            (err) => err,
            () => "COMPLETED"
          )
        )

  // TODO Improve strategy for inserting comma separator
  let firstWrite = true

  return observer$.subscribe({
    next(json) {
      if (firstWrite) {
        // write CSV header
        writeStream.write(`${Object.keys(json).join(sepChar)})\n`)
        firstWrite = false
      } 

      // write CSV line 
      writeStream.write(`${Object.values(json).join(sepChar)}\n`)
    },
    error(err) {
      console.error(err)
    },
    complete(msg) {
      console.log(msg)
    }
  })
}

export {
  csvWriter
}
