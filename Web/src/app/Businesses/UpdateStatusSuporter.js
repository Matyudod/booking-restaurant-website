const Validator = require("fastest-validator");
const errorProvider = require("./ErrorProviders");
const scheme = require("./ValidationProviders");
module.exports = (params, models, res, forTable, status = 0) => {
    const v = new Validator();
    let validationResponse = v.validate(params, scheme.idValidation);
    if (validationResponse !== true) {
        res.status(400).json(errorProvider.errorSignupFieldIsNull);
    } else {
        let id = params.id;
        delete params.id;
        models
            .update(
                {
                    status: status,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            .then((results) => {
                if (results[0] == 0) {
                    let errorNotFound = errorProvider.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", forTable.trim());
                    res.status(200).json(errorNotFound);
                } else {
                    let updateStatusSuccessful = errorProvider.updateStatusSuccessful;
                    updateStatusSuccessful.message = updateStatusSuccessful.message.replace(
                        "{1}",
                        forTable.trim()
                    );
                    res.status(200).json(updateStatusSuccessful);
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(errorProvider.APIErrorServer);
            });
    }
};
