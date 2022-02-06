import {
  randomUUID
} from "crypto"

import {
  mkdir,
  stat
} from "fs"

import {
  readFile
} from "fs/promises"

import {
  homedir
} from "os"

import {
  REQUIRED_DEVICE_CONFIG_KEYS,
  REQUIRED_HANDLER_CONFIG_KEYS
} from "./constants.js"

import {
  yyyyMMddTHHmmssZ
} from "./date-fns.js"

import {
  showError
} from "./show-cli.js"

import {
  ZMQObserver
} from "./ZMQObserver.js"

/**
 * Transform an array of configuration objects into a keyed
 * configuration object
 *
 * @param {Array.<Object>} config - Configuration object array
 * @return {Promise.<Object>}
 */
const configArrayToObject = (config) => Promise.resolve(config.reduce((a,c,i) => { a[i] = c; return a }, {}))

/**
 * Check if `path` is a directory, create if not.
 *
 * @param {string} path - Directory path
 * @return {Promise}
 */
const createDirIfNotExists = (path) => {
  return new Promise((resolve, reject) => {
    expandTilde(path)
      .then(expandedPath => {
         stat(expandedPath, (statErr, stats) => {
           // `expandedPath` does not exist, attempt to create
           if (statErr) {
             mkdir(expandedPath, { 'recursive': true }, (mkdirErr) => {
               if (mkdirErr) {
                 // Directory could not be created at `expandedPath`
                 reject(mkdirErr)
               } else {
                // Directory created successfully at `expandedPath`
                resolve({ 'path': expandedPath, 'result': 'CREATED' })
               }
             })
           // `expandedPath` exists
           } else if (stats.isDirectory()) {
             // `expandedPath` exists and is a directory
             resolve({ 'path': expandedPath, 'result': 'EXISTS' })
           } else {
             // `path` exists but is not a directory
             reject(`'${expandedPath}' EXISTS BUT IS NOT A DIRECTORY`)
           }
        })
      })
  })
}

/**
 * "Expand" tilde (~) at index `0` to user's home directory.
 * NB. ~ is character code `126`
 *
 * @param {str} path - Path 
 * @return {Promixe.<string>}
 */
const expandTilde = (path) => Promise.resolve(path.charCodeAt(0) === 126 ? `${homedir()}${path.slice(1,path.length)}` : path)

/**
 * Initiate stream handler for each `(handler, device)` pair.
 *
 * @param {Object} opts - Options object (from Commander)
 * @return {Promise}
 */
const initStreamHandlers = (opts) => {
  return new Promise((resolve, reject) => {
    const deviceKeys = opts["device"].split(",")
    const dirPath = opts["path"]
    const handlerKeys = opts["handler"].split(",")
  
    if (deviceKeys.length !== handlerKeys.length) {
      reject(`NUMBER OF DEVICES AND HANDLERS REQUESTED MUST MATCH\n\tlength([${deviceKeys}]) != length([${handlerKeys}])`)
    }
  
    Promise.all([
      pickKeysFromConfig(deviceKeys, readDeviceConfig, "DEVICE"),
      pickKeysFromConfig(handlerKeys, readHandlerConfig, "HANDLER")
    ])
    .then(([devices, handlers]) => {
      const pm2Groups = devices.reduce((a,[deviceKey,device],i) => {
        a.push({
          "id": randomUUID(),
          "device": device,
          "handler": handlers[i][1],
          "handlerIndex": handlers[i][0]
        })
        return a
      }, [])

      return Promise.all([
        createDirIfNotExists(dirPath),
        Promise.resolve(pm2Groups)
      ]) 
    })
    .then(([dirResult, pm2Groups]) => {
      console.log(`### dirResult ###`)
      console.log(dirResult)

      console.log(`\n### pm2Groups ###`)
      // Add validated (base) path to each PM2 group
      pm2Groups.forEach(g => {
        console.log(new Object({
          script: `${process.cwd()}/src/handlers/${g.handler.script}`,
          name: `__IOTZMQ__${g.id}`,
          cwd: dirResult.path,
          kill_timeout: 900,
          env: {
            ID: g.id,
            DEVICE: JSON.stringify(g.device)
          }
        }))
      })

      process.exit(1)
    })
    .catch(err => reject(err))
  })
}

/**
 * Pick select keys from a configuration file.
 *
 * @param {Array} keys - Keys to return
 * @param {Promise} readConfigPromise - Promise to resolve
 * @param {string} description - Description of configuration 
 * @return {Promise.<Array||string>} Array on success, String on error
 */
const pickKeysFromConfig = (keys, readConfigPromise, description) => {
  return new Promise((resolve, reject) => {
    readConfigPromise()
      .then(config => {
        const invalidRequests = keys.reduce((a,c) => {
          !config.hasOwnProperty(String(c)) && a.push(c)
          return a
        }, [])

        // Exit if invalid key requested
        if (invalidRequests.length > 0) {
          reject(`ONE OR MORE KEY NOT FOUND IN ${description} CONFIG\n\t{${invalidRequests.join(";")}} ∩ {${Object.keys(config).join(";")}} = ∅`)
        } else {
          resolve(keys.map(k => [k, config[k]]))
        }
     })
  })
}

/**
 * Prepend a `0`
 *
 * @param {string} str -
 * @return {Promise.<string>}
 */
const prependZeroIfLengthOne = (str) => Promise.resolve(str.length === 1 ? `0${str}` : str)

/**
 * Asynchronously load device configuration file
 *
 * @param {string} [path="~/.iot-zmq/config.json"] - Path to config
 * @return {Promise.<Object || Error>}
 */
const readDeviceConfig = (path="~/.iot-zmq/config.json") => {
  return readJSON(path)
    .then(json => validateConfig(json, REQUIRED_DEVICE_CONFIG_KEYS))
    .then(validConfig => configArrayToObject(validConfig))
}

/**
 * Asynchronously load handler configuration file
 * ""
 */
const readHandlerConfig = (path=`./config/handlers.json`) => {
  return readJSON(path)
    .then(json => validateConfig(json, REQUIRED_HANDLER_CONFIG_KEYS))
    .then(validConfig => configArrayToObject(validConfig))
}

/**
 * Asynchronously read a JSON file from disk
 *
 * @param {string} path - Path to file
 * @return {Promise.<Object || Error>}
 */
const readJSON = (path) => {
  return new Promise((resolve, reject) => {
    expandTilde(path)
      .then(expandedPath => readFile(expandedPath, "utf8"))
      .then(fileData => {
        resolve(JSON.parse(fileData))
      })
      .catch(err => {
        reject(err)
      })
    })
}

/**
 * Validate configuration object
 * 
 * @param {Array.<Object>} config - Configuration object array
 * @param {Array.<string>} KEYS - Keys to validate
 * @return {Promise.<Object || Error>}
 */
const validateConfig = (config, KEYS) => {
  return new Promise((resolve, reject) => {
    // a[0] => missing required keys
    // a[1] => all `shortNames`
    const [missingKeys, shortNames] = config.reduce((a,c,i) => {
      // Check if Object lacks required keys 
      KEYS.forEach(k => {
        if (!c.hasOwnProperty(k)) {
          a[0].push(`config[${i}].${k}`)
        }
      })

      // Add `shortName` to array if the key exists
      if (c.hasOwnProperty("shortName")) {
        a[1].push(c.shortName)
      }
    
      return a
    }, [[],[]])

    // Ensure no keys are missing
    missingKeys.length > 0 && reject(`REQUIRED KEYS NOT FOUND: ${missingKeys.join(", ")}`)

    // Ensure `shortNames` are unique
    shortNames.length !== (new Set(shortNames)).size && reject("VALUES OF KEY `shortName` ARE NOT UNIQUE TO SET")
    
    resolve(config)
  })
}

export {
  expandTilde,
  initStreamHandlers,
  pickKeysFromConfig,
  prependZeroIfLengthOne,
  readDeviceConfig,
  readHandlerConfig
}
