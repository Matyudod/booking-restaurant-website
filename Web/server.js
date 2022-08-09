var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.use(express.urlencoded({extended :false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var route = require('./app/app.routers');
route(app);


module.exports = app;