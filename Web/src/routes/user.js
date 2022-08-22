const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/Businesses/CheckAuth");
const checkAdminMiddleware = require("../app/Businesses/CheckAdmin");
const userController = require("../app/Apis/User/UserController");

router.get("/admin-list", userController.adminList);
router.get("/customer-list", userController.customerList);
router.get("/detail/:id", userController.detail);
router.post("/login", userController.loginHandler);
router.post("/signup", userController.signupHandler);
router.put("/update_customer_info", userController.updateUserInfo);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
