const Validator = require("fastest-validator");
const scheme = require("./ValidationProviders");
const errorProvider = require("./ErrorProviders");
const e = require("express");
module.exports = (id, models, res, forTable, status = true) => {
    let one = {
        id: parseInt(id),
    };
    const v = new Validator();
    let validationResponse = v.validate(one, scheme.idValidation);
    if (validationResponse !== true) {
        res.status(400).json(errorProvider.errorIdFieldIsNull);
    } else {
        models
            .findOne({
                where: {
                    id: id,
                    status: status,
                },
            })
            .then((result) => {
                if (result != null) res.status(200).json(result);
                else {
                    let error = errorProvider.errorNotFound;
                    error.message = error.message.replace("{1}", forTable.trim());
                    res.status(400).json(errorProvider.errorNotFound);
                }
            })
            .catch((error) => {
                res.status(500).json(errorProvider.APIErrorServer);
            });
    }
};
