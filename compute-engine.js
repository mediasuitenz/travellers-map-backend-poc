'use strict';

var async  = require('async')

var config = require('./config.json')

module.exports = function () {

  var that = this

  //load adaptors from config.json
  config.adapters.forEach(function (adapter) {
    console.log('loading adapter ' + adapter.name)
    that.use('./adapters/' + adapter.name)
  })

  //create the computation engine which will use the various adapters to work
  //out a score for the supplied geojson road segment
  that.add({ action: 'compute-weighting' }, function (args, cb) {

    console.log('computation request initiated')

    var roadSegment = args.geojson
      , weightings  = {}

    //create a task for each adapter
    //each adapter will return a value from 0-10 for how impacted
    //that section of road is by it's type of roading impacts
    var tasks = config.adapters.map(function (adapter) {
      return function (callback) {
        that.act({ adapter: adapter.name, geojson: roadSegment }, function (err, result) {
          weightings[adapter.name] = result
          callback()
        })
      }
    })

    async.parallel(tasks, function () {

      //now we have an object that looks like:
      //{"tmp":7,"bluetooth":4}
      //which we can use to do make some decisions about the overall weighting
      //of the given road segment.
      //We can then return that in the callback
      cb(null, 5)

    })

  })

}
