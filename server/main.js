'use strict';

var port = process.env.PORT || 8080

var http = require('http')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')


/* Database - Models */

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/el-contactor');

var Contact = mongoose.model('Contact', {
  number: { type: String, maxlength: 5 },
  street: { type: String, maxlength: 150 },
  city: { type: String, maxlength: 100 },
  postcode: { type: String, maxlength: 8 },
  firstname: { type: String, maxlength: 100 },
  lastname: { type: String, maxlength: 100 }
})


/* Server */

var server = http.createServer(app)
server.listen(port)
