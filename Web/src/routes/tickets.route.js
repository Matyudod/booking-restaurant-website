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

router.get("/pagination", tickets.getList);
router.get("/get-pending/:customer_id", tickets.getListPendingOfCustomer);
router.get("/get-orderd/:customer_id", tickets.getListOrderdOfCustomer);
router.post("/create", tickets.create);
router.put("/update/:id", tickets.update);
router.delete("/delete/:id", tickets.delete);

module.exports = router;
