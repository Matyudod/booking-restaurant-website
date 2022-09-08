const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/Middlewares/CheckAuth");
const checkAdminMiddleware = require("../app/Middlewares/CheckAdmin");
const tableController = require("../app/Apis/Table/TableController");

router.get("/pagination", tableController.pagination);
router.put("/updata-status/:id", tableController.updateStatusTable);

module.exports = router;
