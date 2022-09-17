const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/middlewares/authentication");
const checkAdminMiddleware = require("../app/middlewares/check-admin");
// const foodController = require("../app/controllers/food.controller");

// router.get("/pagination", foodController.pagination);
// router.get("/get/:id", foodController.get);

// router.post("/create", foodController.create);
// router.put("/update/:id", foodController.update);

// router.delete("/delete/:id", foodController.delete);

module.exports = router;
