import pc from "picocolors"

import {
  pickKeysFromConfig,
  readDeviceConfig,
  readHandlerConfig
} from "./utils.js"

/**
 * Get all entities in a configuration file
 *
 * @param {Promise} configPromise - Promise to resolve for input
 * @return {Promise}
 */
const getEntires = (configPromise) => {
  return new Promise((resolve, reject) => {
    configPromise
      .then(entities => resolve(entities))
      .catch(err => reject(err))
  })
}

/**
 * Pretty print a device.
 * Convenience method for `showObject`.
 */
const showDevice = (key,device) => showObject(key,device)

/**
 * Pretty print multiple device configurations to the console
 */
const showDevices = () => {
  getEntires(readDeviceConfig())
    .then(devices => {
      // Insert whitespace
      console.log("")

      // Show section head
      console.log(pc.bgGreen(pc.black("AVAILABLE DEVICES")))

     // Show each device
      Object.entries(devices)
        .forEach(([key,device]) => showDevice(key, device))
    })
    .catch(err => showError(err))
}

/**
 * Print entires of an Object to console with colors
 *
 * @param {Object} object - Object to show
 * @param {Function} keyColor - Color function for keys
 * @param {Function} valueColor - Color function for values
 */
const showEntries = (object, keyColor, valueColor) => {
  // Show device object `(key, value)` pairs
  Object.entries(object)
    .forEach(([k,v]) => {
      console.log(` ${keyColor(k)}: ${valueColor(v)}`)
    })
}

/**
 * Pretty print error
 *
 * @param {string} msg - Error message
 */
const showError = (msg) => console.log(pc.yellow(`${pc.underline("ERROR:")} ${msg}`))

/**
 * Pretty print a handler.
 * Convenience method for `showObject`.
 */
const showHandler = (key,handler) => showObject(key,handler)

/**
 * Pretty print available handlers to the console
 */
const showHandlers = () => {
  getEntires(readHandlerConfig())
    .then(handlers => {
      // Insert whitespace
      console.log("")

      // Show section head
      console.log(pc.bgGreen(pc.black("AVAILABLE HANDLERS")))

      // Show each handler
      Object.entries(handlers)
        .forEach(([key,handler]) => showObject(key, handler))
    })
    .catch(err => showError(err))
}

/**
 * "Show" requested (valid) keys
 *
 * @param {Array} keys - Keys to return
 * @param {Promise} readConfigPromise - Promise to resolve
 * @param {string} description - Description of configuration 
 * @param {function} showFn - "Show" function to use
 */
const showKeysFromConfig = (keys, readConfigPromise, description, showFn) => {
  pickKeysFromConfig(keys, readConfigPromise, description)
    .then(response => response.forEach(([key,obj]) => showFn(key,obj)))
    .catch(err => showError(err))
}

/**
 * Pretty print contents of a device's configuration to the console
 *
 * @param {string} key - Key of device in configuration file
 * @param {Object} object - Configuration object for device
 */
const showObject = (key, object) => {
  // Show object name and key as header
  console.log(pc.bold(pc.bgWhite(pc.black(`${key}: ${object.name}${object.hasOwnProperty("shortName") ? ` [${object.shortName}]` : ""}`))))

  // Show `object` entries
  showEntries(
    object,
    (k) => pc.underline(pc.yellow(k)),
    (v) => pc.white(v)
  )

  // Insert whitespace
  console.log("")
}

export {
  showDevice,
  showDevices,
  showError,
  showHandler,
  showHandlers,
  showKeysFromConfig
}
