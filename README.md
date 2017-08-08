# cards-assistant

This is an beta version of a steam trading card trading assistant. Wow, that's a mouthful.

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
