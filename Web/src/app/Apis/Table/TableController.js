const models = require("../../../../models");
const errorProvider = require("../../Businesses/ErrorProviders");
const Validator = require("fastest-validator");
const scheme = require("../../Businesses/ValidationProviders");
const getList = require("../../Businesses/GetListSupporter");
const getOne = require("../../Businesses/GetOneSupporter");
const update = require("../../Businesses/UpdateSupporter");
const updateStatus = require("../../Businesses/UpdateStatusSuporter");
class TableController {
    pagination(req, res) {
        getList(req.query, models.Tables, res, true);
    }
}
module.exports = new TableController();
