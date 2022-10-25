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

router.get("/pagination", mainingredient.getList);
router.get("/get-all", mainingredient.getAll);
router.post("/create", mainingredient.create);
router.put("/update/:id", mainingredient.update);
router.delete("/delete/:id", mainingredient.delete);

module.exports = router;
