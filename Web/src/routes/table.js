const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/middlewares/authentication");
const checkAdminMiddleware = require("../app/middlewares/check-admin");
// const tableController = require("../app/controllers/table.controller");

// router.get("/pagination", tableController.pagination);
// router.put("/updata-status/:id", tableController.updateStatusTable);

module.exports = router;
