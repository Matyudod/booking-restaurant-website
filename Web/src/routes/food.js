const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/middlewares/CheckAuth");
const checkAdminMiddleware = require("../app/middlewares/CheckAdmin");
const foodController = require("../app/apis/food.controller");

router.get("/pagination", foodController.pagination);
router.get("/get/:id", foodController.get);

router.post("/create", foodController.create);
router.put("/update/:id", foodController.update);

router.delete("/delete/:id", foodController.delete);

module.exports = router;
