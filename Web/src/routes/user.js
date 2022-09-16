const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/middlewares/CheckAuth");
const checkAdminMiddleware = require("../app/middlewares/CheckAdmin");
const userController = require("../app/apis/user.controller");

router.get("/admin-list", userController.adminList);
router.get("/customer-list", userController.customerList);
router.get("/detail/:id", userController.detail);
router.post("/login", userController.loginHandler);
router.post("/signup", userController.signupHandler);
router.put("/update_customer_info", userController.updateUserInfo);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
