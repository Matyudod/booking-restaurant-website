const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/middlewares/CheckAuth");
const checkAdminMiddleware = require("../app/middlewares/CheckAdmin");
const tableController = require("../app/apis/table.controller");

router.get("/pagination", tableController.pagination);
router.put("/updata-status/:id", tableController.updateStatusTable);

module.exports = router;
