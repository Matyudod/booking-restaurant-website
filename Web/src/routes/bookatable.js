const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/businesses/CheckAuth");
const checkAdminMiddleware = require("../app/businesses/CheckAdmin");
const bookATableController = require("../app/apis/book-a-table.controller");

router.post("/", bookATableController.bookAtable);

module.exports = router;
