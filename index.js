var tiles = require('./lib/timezones.json');
var tilebelt = require('@mapbox/tilebelt');

var z = Object.keys(tiles)[0].split('/').map(Number)[2];

module.exports = {
  getFuzzyLocalTimeFromPoint: getFuzzyLocalTimeFromPoint,
  _getParent: _getParent,      // expose for testing
  _getChildren: _getChildren   // expose for testing
};

/**
 * Returns the local time at the point of interest.
 * @param  {Integer} timestamp   a unix timestamp
 * @param  {Array}   point       a [lng, lat] point of interest
 * @return {String}              a IANA timezone 
 */
function getFuzzyLocalTimeFromPoint(timestamp, point) {
  var tile = tilebelt.pointToTile(point[0], point[1], z).join('/');
  return tiles[tile];
}

/**
 * [private function]
 */
function _getParent(tile) {
  if (tile[2] < z) throw new Error('input tile zoom < ' + z);
  if (tile[2] > z) return _getParent(tilebelt.getParent(tile));
  else return tile;
}

/**
 * [private function]
 */
function _getChildren(tile) {
  if (tile[2] > z) throw new Error('input tile zoom > ' + z);
  if (tile[2] === z) return [tile];

  var children = tilebelt.getChildren(tile);
  return _getChildren(children[0])
         .concat(_getChildren(children[1]))
         .concat(_getChildren(children[2]))
         .concat(_getChildren(children[3]));
}
