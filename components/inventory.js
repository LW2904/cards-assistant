const log = require('winston')

let community = new (require('steamcommunity'))()

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    community.getUserInventoryContents(
      id, 753, 6, true, (err, inv, c, total) => {
        if (err) reject(err.message)
        log.debug(`got ${total} items from ${id}'s inventory.`)
        resolve(inv)
      }
    )
  })
}

exports.parse = (inv, blacklist = []) => {
  let cards = {}
  let count = 0
  for (let item of inv) {
    if (item.type.indexOf('Trading Card') !== -1) {
      let appid = item.market_fee_app
      if (!blacklist.includes(appid) && item.market_name.indexOf('Foil') === -1) {
        count++
        if (!cards[appid]) cards[appid] = [ item.market_name ]
        else cards[appid].push(item.market_name)
      }
    }
  }
  log.debug(`parsed inventory, ${count}/${inv.length} valid cards found.`)
  return cards
}
