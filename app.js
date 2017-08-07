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
*                  exclude any foil cards
* 3. get uncrafted full sets from inventory
*     - get unique cards, if length equal to set data true_length then
*       we now have all cards required for a set
*     - f o r  n o w, just log that we found a full set that the partner
        does not have.
*/

const CONFIG = require('../CA-config')

const OWNER =  CONFIG.owner || require('readline-sync').question('Owner: ')
const PARTNER =  CONFIG.partner || require('readline-sync').question('Partner: ')

const badges = require('./components/badges')
const data = require('./components/data')
const inventory = require('./components/inventory')
const log = require('./components/logger')

let partner = {}
