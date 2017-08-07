/**
* 1. get AppIDs for badges of partner (= get blacklist)
* 2. get trading cards from owner inventory, grouped by appid
* 3. get uncrafted sets with unique item identifiers (for eventual tradebot extension)
*/

const CONFIG = require('../CA-config')

const OWNER =  CONFIG.owner || require('readline-sync').question('Owner: ')
const PARTNER =  CONFIG.partner || require('readline-sync').question('Partner: ')

const badges = require('./components/badges')
const log = require('./components/logger')

let partner = {}

badges
.get(PARTNER, CONFIG.apikey)
.then((result) => {
  partner.badges = result
  partner.blacklist = badges.appIDs(result)
}).catch((error) => log.error(`Couldn't get badges from partner.`, error))
