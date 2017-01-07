
"use strict"; 
var compression = require('compression');
var express = require('express');


var DocumentDBClient = require('documentdb').DocumentClient;

var config = require('./config');
var GameList = require('./routes/gamelist');
var GameDao = require('./routes/gameDao');

var docDbClient = new DocumentDBClient(config.host, {
     masterKey: config.authKey
 });
 
 
 //console.log(docDbClient);

var socket_io    = require( "socket.io" );

var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// Socket.io
var io           = socket_io();
app.io           = io;


//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/', routes);


module.exports = app;