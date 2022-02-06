import {
  prependZeroIfLengthOne
} from "./utils.js"

/**
 * Create formatted string from `Date`
 *
 * @param {Date} ts - Date to generate string from 
 * @return {Promise.<string>} 
 */
const yyyyMMdd = (ts) => {
    return Promise.all([
        `${ts.getUTCMonth() + 1}`,
        `${ts.getUTCDate()}`
      ].map(val => prependZeroIfLengthOne(val))
    )
    .then(([MM,dd]) => `${ts.getUTCFullYear()}${MM}${dd}`)
}

/**
 * Create formatted string from Date(Time) input
 *
 * @param {Date} ts - Date to generate string from 
 * @return {Promise.<string>} 
 */
const yyyyMMddTHHmmss = (ts) => {
    return Promise.all([
        yyyyMMdd(ts)
      ].concat([
        `${ts.getUTCHours()}`,
        `${ts.getUTCMinutes()}`,
        `${ts.getUTCSeconds()}`
      ].map(val => prependZeroIfLengthOne(val)))
    )
    .then(([yyyyMMdd,HH,mm,ss]) => `${yyyyMMdd}T${HH}${mm}${ss}`)
}

/**
 * Add "Z" to formatted DateTime string
 *
 * @param {Date} ts - Date to generate string from 
 * @return {Promise.<string>} 
 */
const yyyyMMddTHHmmssZ = (ts) => yyyyMMddTHHmmss(ts).then(dt => `${dt}Z`)

export {
  yyyyMMdd,
  yyyyMMddTHHmmss,
  yyyyMMddTHHmmssZ
}
