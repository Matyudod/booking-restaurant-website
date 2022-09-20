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

router.get("/pagination/:ticket_id", orders.getListWithTicketID);
router.post("/create", orders.create);
router.put("/update/:id", orders.update);
router.delete("/delete/:id", orders.delete);

module.exports = router;
