const Validator = require("fastest-validator");
const scheme = require("./ValidationProviders");
const errorProvider = require("./ErrorProviders");
module.exports = (params, models, res, status = 1) => {
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

    models
        .findAndCountAll({
            where: {
                status: status,
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
};
