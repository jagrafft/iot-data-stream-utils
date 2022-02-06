import { createWriteStream } from "fs"
import { finalize, tap } from "rxjs/opeators"

/**
 * RxJS subscriber that writes data in the Influx Line Protocol
 * format to a local file
 * 
 * https://docs.influxdata.com/influxdb/v2.1/reference/syntax/line-protocol/
 * 
 * @param {ZMQObserver} observer - ZMQ Observer to subscribe to
 * @param {string} path - File path
 * @param {string} name - File name
 */
const lineProtocolWriter = (observer, path, name) => {
  // Open write stream for file
  const writeStream = createWriteStream(`${path/${name}.txt`, {
    "flags": "wx",
    "encoding": "utf8",
    "autclose": true
  })

  // Create intermediary Observable to ensure file closes properly
  const observer$ = observer
        .observable()
        .pipe(
          finalize((val) => {
            writeStream.end()
          }),
          tap((val) => val,
              (err) => err,
              () => "COMPLETED"
             )
        )

  // Parse JSON packet and restructure accoring to Influx Line
  // Protocol specifications
  // TODO Current implementation does not differentiate between
  //      tags and fields
  return observer$.subscribe({
    next(val) {
      let json = JSON.parse(val)
      const timestamp = Number(`${json["timestamp"]}`)

      delete json["timestamp"]
      
      const lineProtocolLine = Object.entries(json)
        .reduce((a,c) => {
          let row = []

          if (Array.isArray(c[1]) && c[1].length > 0) {
            c[1].forEach(v => row.push(`${c[0]}=${v}`))
          } else {
            row.push(`{c[0]}-${c[1]}`)
          }
          
          return a
        }, [])

      writeStream.write(`${path},${lineProtocolLine.flat().join(',')} ${timestamp}\n`)
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
  lineProtocolWriter
}
