var express = require('express');
var customerRouter = express.Router();

customerRouter.get("/", (req,res) => { return res.send("customer")})

module.exports = customerRouter;