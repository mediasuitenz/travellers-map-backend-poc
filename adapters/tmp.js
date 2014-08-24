'use strict';

module.exports = function () {
  this.add({ adapter: 'tmp' }, function (args, cb) {
    //do some kind of lookup for data relating to given
    //args.geojson to see if it intersects with any roading issues and calc
    //a value from 0-10 and return that
    cb(null, 7)
  })
}
