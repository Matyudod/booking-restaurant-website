var express = require('express');
var adminRouter = express.Router();

adminRouter.get("/", (req,res) => { return res.send("admin")})

module.exports = adminRouter;