const log = require('winston')

const SteamCommunity = require('steamcommunity')
let community = new SteamCommunity()

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    id = new (SteamCommunity.SteamID)(id)

    community.getSteamUser(id, (err, user) => {
      if (err) reject(err.message)
      log.debug(`got profile of ${id}/${user.name}.`)

      // Steam = 753, Community contextID = 6, tradeable only
      user.getInventoryContents(753, 6, true, (err, inv, c, total) => {
        if (err) reject(err.message)
        log.debug(`got ${total} items from ${id}/${user.name}'s inventory.`)
        resolve(inv[100])
      })
    })
  })
}
