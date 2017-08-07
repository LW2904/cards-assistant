const URL = 'https://api.steampowered.com/IPlayerService/GetBadges/v1/'

const request = require('request')
const log = require('winston')

exports.get = (id, key) => {
  return new Promise((resolve, reject) => {
    if (!id || !key) reject(Error(`no ${id ? 'SteamID' : 'API Key'} provided.`))

    request(`${URL}?key=${key}&steamid=${id}&format=json`, (err, res, body) => {
      log.debug(`steam API GET: ${res.statusCode}`)
      if (err || res.statusCode !== 200) reject(Error(err ? err : res.statusCode))
      else {
        body = JSON.parse(body)
        if (body.response && body.response.badges) resolve(body.response.badges)
        else reject(Error(`couldn't parse response object.`))
      }
    })
  })
}

exports.appIDs = (badges) => {
  let ids = []
  for (let badge in badges) {
    if (badge.appid) ids.push(badge.appid)
  }
  return ids
}
