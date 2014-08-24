'use strict';

var seneca  = require('seneca')()
  , express = require('express')

var app = express()

//set up the compute engine (tm) by loading with seneca
seneca
  .use('./compute-engine')
  .listen()

//set up an express server to provide the rest endpoint
app.get('/impact/:geojson', function (req, res) {
  seneca.act({ action: 'compute-weighting', geojson: req.params.geojson }, function (err, result) {
    res.send({value: result})
  })
})

app.listen(3002)
