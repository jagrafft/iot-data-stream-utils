import {
  Command,
  Option
} from "commander/esm.mjs"

import {
  showDevice,
  showDevices,
  showError,
  showHandler,
  showHandlers,
  showKeysFromConfig
} from "./show-cli.js"

import {
  initStreamHandlers,
  readDeviceConfig,
  readHandlerConfig
} from "./utils.js"

// CLI options
const options = [
  new Option("-c, --close [streams]", "Close one (1) or more open streams"),
  new Option("-d, --device [devices]", "Show details of a device configuration (leave empty for all)"),
  new Option("--devices", "Show details of all device configurations"),
  new Option("-n, --handler [handlers]", "Show available handlers"),
  new Option("-p, --path [path]", "Path to device configuration file"),
  new Option("-s, --status [streams]", "Show the status of one (1) or more streams (leave empty for all)")
]

// Initiate Commander program
let program = new Command()
program.showHelpAfterError()

// Add `Option`s to `program`
options.forEach(option => program.addOption(option))

// Parse CLI arguments
program.parse(process.argv)

// Display help if no options passed
Object.keys(program.opts()).length > 0 || program.help()

// Function mappings for `boolean` flags
const runFns = new Object({
  "close": () => showError("'close' flag requires at least one (1) argument"),
  "device": () => showDevices(),
  "devices": () => showDevices(),
  "handler": () => showHandlers(),
  "path": () => showError("'path' flag requires an argument"),
  "status": () => showError("-s, --status NOT YET IMPLEMENTED")
})

// Function mappings for flags with options
const runWithOptsFns = new Object({
  "close": () => showError("-c, --close [streams] NOT YET IMPLEMENTED"),
  "device": (keys) => showKeysFromConfig(keys, readDeviceConfig, "DEVICE", showDevice),
  "handler": (keys) => showKeysFromConfig(keys, readHandlerConfig, "HANDLER", showHandler),
  "path": () => showError("(-p || --path) valid only when used with 'device' AND 'handler' flags"),
  "status": () => showError("-s, --status [streams] NOT YET IMPLEMENTED")
})

// Function mappings for write states, which invoke PM2
// NB. All functions must return Promises
const writeStates = new Object({
  "device,handler,path": (opts) => initStreamHandlers(opts)
})

/**
 * Parse Commander's `program.opts()` object
 * Run for side effects.
 *
 * @param {Object} opts - Commander `opts()` object
 */
const commanderOptsParser = (opts) => {
  // Categories for flags to help with automated handling
  let requests = new Object({
    "run": [],
    "runWithOpts": [] 
  })

  // Assign flags to categories
  Object.entries(opts)
    .forEach(([key,vals]) => {
      if (typeof vals === "boolean") {
        requests["run"].push(key)
      } else if (typeof vals === "string") {
        requests["runWithOpts"].push([key, vals.split(",")])
      } else {
        showError(`TYPE '${typeof vals}' NOT SUPPORTED`)
        process.exit(1)
      }
    })

  // TODO Current definition does not process flags with options if there
  //      is a flag *without* options in the set. Is this desired?
  if (requests["run"].length > 0) {
    // Run functions with no options
    // NB. `write` keys all require options
    requests["run"].forEach(r => runFns[r]())
  } else if (writeStates.hasOwnProperty(Object.keys(opts).sort().join(","))) {
    // Check for `write` keys then handle
    // NB. Functions return Promises
    writeStates[Object.keys(opts).sort().join(",")](opts)
      .then(x => console.log(x))
      .catch(err => {
        showError(err)
        process.exit(1)
      })
  } else {
    // Run functions with options
    // NB. These are "show" requests
    requests["runWithOpts"]
      .forEach(([key,vals]) => runWithOptsFns[key](vals))
  }
}

// Evalute options passed from CLI
commanderOptsParser(program.opts())
