# cards-assistant

This is a beta version of a steam trading card trading assistant. Wow, that's a mouthful.

![](http://i.imgur.com/aDIlZ3b.png)

## Goal

The concept is simple, check the games the trading partner has badges for, check all uncrafted sets you have in your inventory,
and then output the sets that you have, but the partner doesn't.

## Status

As of __0.4__, this application is functional.

I have not been able to test 0.4 very extensively yet, so expect bugs and maybe even occasional crashes.
Older components have already been tested, and are considered stable.

*Thanks to BLS member iDaft for help with testing.*

## Usage

Make sure you have [NodeJS](https://nodejs.org/en/) installed.

1. Clone or download the repository.
2. One level above the repo folder, create `CA-config.json`, and input your config as described further below.
*Note that the config file can also be an empty JSON (with only {}), the app will query you for the information when it needs it.*
3. In the repository folder, do `npm install`
4. Run the app with `node app`

### Config

Example config:
```
{
  "owner": "76561198091491690",
  "partner": "76561198237658662",
  "apikey": ""
}
```
The `owner` and `partner` properties are SteamIDs (in the SteamID64 format).
Your own, personal `APIkey` can be obtained [here](https://steamcommunity.com/dev/apikey).

### Need help?

I realize that the instructions might be somewhat unclear to those inexperienced with programming, 
feel free to message me on [steam](http://steamcommunity.com/profiles/76561198091491690) if you have questions. 

## How it works

If you take a look at the app.js file, you will notice a rather lengthy comment block where I took notes on the 
things that need to be done in the application.

It looks close to this:

#### Make all web requests

1. Get badges of partner from the SteamAPI
2. Get inventory of owner from the SteamCommunity module which communicates with the SteamAPI
3. Get a huge JSON file with steam trading card set information from steam.tools.

*The steam.tools data is used with explicit permission.*
   
#### Parse the information

- We only need to know which games the partner has badges for, discard the other information.
- We only need trading cards from the owner inventory, discard all other items (+ foil cards).
- Remove all trading cards that are for games the owner already has a badge for.

#### Get sets from owner inventory

Ok so this is a bit of a challenge, and I solved it very sloppily.
In order to code something like a tradebot for cards, this would need to be revised, but for our 
purposes it works

1. Get all unique cards of every game.
2. If the number of unique cards per game equals the number of cards needed for the badge (we got this number from steam.tools) 
then we have found an __uncrafted, full__ set that the partner __doesn't have__. 
