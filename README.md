# timespace [![Build Status](https://travis-ci.org/mapbox/timespace.svg?branch=master)](https://travis-ci.org/mapbox/timespace)
Compute fuzzy local time from a location. The default accuracy is [zoom level 8](http://wiki.openstreetmap.org/wiki/Zoom_levels). See ["Regenerate timezones.json"](https://github.com/mapbox/timespace#regenerate-timezonesjson) section for instructions on how to change accuracy.

Timezone data is from https://github.com/evansiroky/timezone-boundary-builder/.

## Install
```
npm install https://github.com/GilTeixeiraPT/timespace-without-momentjs
```

## Test
```
npm run test
```

## Use

### Functions

```js
var ts = require('@mapbox/timespace');

var timestamp = Date.now();
var point = [-122.27783203125, 37.84015683604136];
var timezone = ts.getFuzzyLocalTimeFromPoint(timestamp, point);
//=> a IANA timezone string (e.g. 'America/Los_Angeles')
```

`./lib/timezones.json` file contains the timezone name of every z8 tile that contains land.

## Regenerate timezones.json
**You need to add moment and moment-timezone to run these scripts. They were removed on this fork.**

To update timezone.json,
1. find the link address of the latest timezones.shapefile.zip release from https://github.com/evansiroky/timezone-boundary-builder/releases,
2. replace the link address in [this line](https://github.com/mapbox/timespace/blob/master/regenerate/regenerate-timezones.sh#L1) with the the link from step 1
3. run `npm run regenerate`
4. run `npm run test` to verify the new timezones.json file is ok


To generate timezone.json for another zoom level:
1. change [the number in this line](https://github.com/mapbox/timespace/blob/master/regenerate/regenerate-timezones.sh#L8) to the desired zoom level,
2. run `npm run regenerate`
3. run `npm run test` to verify the new timezones.json file is ok

