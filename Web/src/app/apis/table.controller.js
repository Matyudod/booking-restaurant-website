const models = require("../../../models");
const errorProvider = require("../businesses/ErrorProviders");
const { Op } = require("sequelize");
const Validator = require("fastest-validator");
const scheme = require("../businesses/ValidationProviders");
const getList = require("../businesses/GetListSupporter");
const getOne = require("../businesses/GetOneSupporter");
const update = require("../businesses/UpdateSupporter");
const updateStatus = require("../businesses/UpdateStatusSuporter");
//status : 2 is used | 1 is waiting | 0 is blank | -1 is removed
class TableController {
    pagination(req, res) {
        let params = req.query;

        let pagination = {
            page: parseInt(params.page) || 1,
            size: parseInt(params.size) || 10,
            field: params.field || "id",
            is_reverse_sort:
                (params.is_reverse_sort == "true"
                    ? true
                    : params.is_reverse_sort == "false"
                    ? false
                    : null) || false,
        };
        let sorting = pagination.is_reverse_sort ? "DESC" : "ASC";
        let order = null;
        if (pagination.field != null) {
            if (pagination.is_reverse_sort != null) {
                order = [pagination.field, sorting];
            } else {
                order = [pagination.field];
            }
        }

        const v = new Validator();
        let validationResponse = v.validate(pagination, scheme.pageValidation);
        if (validationResponse !== true) {
            res.status(400).json(errorProvider.errorSignupFieldIsNull);
        }

        models.Tables.findAndCountAll({
            where: {
                status: {
                    [Op.not]: -1,
                },
            },
            order: [order],
            limit: pagination.size,
            offset: (pagination.page - 1) * pagination.size,
        })
            .then((results) => {
                results.page = pagination.page;
                results.size = pagination.size;
                res.status(200).json(results);
            })
            .catch((error) => {
                res.status(500).json(errorProvider.APIErrorServer);
            });
    }

    updateStatusTable(req, res) {
        let table = {
            id: parseInt(req.params.id),
        };
        let status = {
            status: parseInt(req.body.id),
        };

        const v = new Validator();
        let validationResponse = v.validate(status, scheme.statusValidation);
        if (validationResponse !== true) {
            res.status(400).json(errorProvider.errorSignupFieldIsNull);
        } else {
            updateStatus(table, models.Tables, res, "User", status.status);
        }
    }
}
module.exports = new TableController();
