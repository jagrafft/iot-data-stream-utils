import pm2 from "pm2"

/**
 * Delete a PM2 process
 *
 * @param {string | Number} - ID of process
 * @returns {Promise}
 */
const pm2delete = (id) => {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      pm2.delete(id, (err) => {
        if (err) { reject(err) }

        resolve(`${id} removed from PM2`)
      })
    })
  })
}

/**
 *
 *
 * @returns {Promise}
 */
// (process,fn)
const pm2describe = () =>  {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      
    })
  })
}

/**
 * List processes in PM2
 *
 * @returns {Promise.<Array>}
 */
const pm2list = () =>  {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      pm2.list((err,list) => {
        if (err) { reject(err) }

        resolve(list)
      })
    })
  })
}

/**
 * Return a PM2 Process Description object
 * 
 * @return {Promise.<Object>}
 */
const pm2ProcDesc = () =>  {
  return new Promise((resolve, reject) => {
  })
}

/**
 *
 *
 * @returns {Promise}
 */
// (process,fn)
const pm2reload = () => {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      
    })
  })
}

/**
 *
 *
 * @returns {Promise}
 */
// (process,[options],fn)
const pm2restart = () => {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      
    })
  })
}

/**
 * Start a PM2 process
 *
 * @param {Object} procDesc - Process description object
 * @returns {Promise}
 */
// (process,fn)
const pm2start = (procDesc) => {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      pm2.start(procDesc, (err) => {
        if (err) { reject(err) }

        reesolve(`${procDesc.} started`)
      }) 
    })
  })
}

/**
 *
 *
 * @returns {Promise}
 */
// (process,fn)
const pm2stop = () => {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) { reject(err) }

      
    })
  })
}

export {
  pm2delete,
  pm2describe,
  pm2list,
  pm2ProcDesc,
  pm2reload,
  pm2restart,
  pm2start,
  pm2stop
}
