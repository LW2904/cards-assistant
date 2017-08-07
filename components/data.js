const fs = require('fs')
const request = require('request')
const log = require('winston')

module.exports = function() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('../set_data.json')) {
      log.debug(`set_data.json found.`)
      resolve(require('../set_data'))
    } else {
      request('http://cdn.steam.tools/data/set_data.json', (err, res, body) => {
        log.debug(`steam.tools CDN GET: ${res.statusCode}`)
        if (err || res.statusCode !== 200) reject(Error(err ? err: res.statusCode))
        fs.writeFileSync('set_data.json', body)
        log.debug(`set_data.json written.`)
        resolve(JSON.parse(body))
      })
    }
  })
}
