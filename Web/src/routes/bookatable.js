const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const checkAuthMiddleware = require("../app/Businesses/CheckAuth");
const checkAdminMiddleware = require("../app/Businesses/CheckAdmin");
const bookATableController = require("../app/Apis/BookATable/BookATableController");

router.post("/", bookATableController.bookAtable);

module.exports = router;
