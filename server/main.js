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

var server = http.createServer(app)
server.listen(port)
