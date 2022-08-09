
var express = require('express');
var path = require('path');
const {Auth} = require("../../controlers/AuthControler");
var authRouter = express.Router();

var authServices = new Auth();

authRouter.get('/login', authServices.login);
authRouter.post('/login', authServices.login);
authRouter.get('/signup', authServices.signup);
authRouter.get('/authorize', authServices.authorize);

module.exports = authRouter;
