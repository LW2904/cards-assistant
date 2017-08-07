/**
* 1. do all async operations:
*     - get badges of partner
*     - get inventory of owner
*     - get (steal) set data from steam.tools
*     - if any fail, exit - continue when all are done
* 2. parse the stuff
*     - badges: we only need appids - this is our blacklist
*     - inventory: we only need trading cards (sorted by appid, preferably)
*                  exclude any cards for appids that are blacklisted
*                  exclude any foil cards (they would impede set detection)
* 3. get uncrafted full sets from inventory
*     - get unique cards, if length equal to set data true_length then
*       we now have all cards required for a set
*     - f o r  n o w, just log that we found a full set that the partner
*       does not have.
*/

const CONFIG = require('../CA-config')

const OWNER =  CONFIG.owner || require('readline-sync').question('Owner: ')
const PARTNER =  CONFIG.partner || require('readline-sync').question('Partner: ')

const badges = require('./components/badges')
const data = require('./components/data')
const inventory = require('./components/inventory')
const log = require('./components/logger')

let partner = {}
let owner = {}
let sets

Promise.all([
	badges.get(PARTNER, CONFIG.apikey),
	inventory.get(OWNER),
	data()
]).catch(err => {
	log.info(`something went wrong in the async chain: ${err}`)
}).then(res => {
	if (res[0] && res[1] && res[2]) log.info(`async chain finished, parsing data.`)
	else log.error(`something went wrong.`)

	let [ badg, inv, setData ] = res

	partner.ids = badges.appIDs(badg)
	owner.inv = inventory.parse(inv, partner.ids)
	sets = setData.sets

	return
}).catch(err => {
	log.error(`something went wrong while parsing: ${err}`)
}).then(() => {
	log.info(`finished parsing, doing magic`)

	for (let setData of sets) {
		if (owner.inv[setData.appid]) {
			let unique = [...new Set(owner.inv[setData.appid])]
			if (unique.length === setData.normal.count) {
				// We have at least one set for the game (setData.appid)
				log.info(`owner has at least one uncrafted set for game ${setData.appid} that partner does not have`)
			}
		}
	}

}).catch(err => {
	log.error(`something went wrong while working the magic: ${err}`)
})
