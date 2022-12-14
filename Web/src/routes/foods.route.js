const express = require("express");
const router = express.Router();
const checkAuth = require("../app/middlewares/authentication");
const checkAdmins = require("../app/middlewares/check-admin");
const {
    bills,
    comments,
    discounts,
    feedbacks,
    foods,
    mainingredientdetails,
    mainingredient,
    orders,
    tables,
    tickets,
    typesofparty,
    users,
} = require("../app/controllers/index.controller");

router.get("/pagination", foods.getList);
router.get("/detail/:id", foods.detail);
router.get("/list/:main_ingredient_id", foods.getFoodWithMainIngredientId);
router.post("/create", checkAdmins, foods.create);
router.put("/update/:id", checkAdmins, foods.update);
router.delete("/delete/:id", checkAdmins, foods.delete);

module.exports = router;
