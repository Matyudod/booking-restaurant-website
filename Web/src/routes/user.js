const express = require('express')
const router = express.Router();

const userController = require("../app/Apis/User/UserController")

router.post("/login",userController.loginHandler);
router.post("/signup",userController.signupHandler);

module.exports = router;