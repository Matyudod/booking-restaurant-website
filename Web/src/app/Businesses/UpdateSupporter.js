const Validator = require("fastest-validator");
const errorProvider = require("./ErrorProviders");
module.exports = (params, validate, models, res, forTable, status = true) => {
  const v = new Validator();
  let validationResponse = v.validate(params, validate);
  if (validationResponse !== true) {
    res.status(400).json(errorProvider.errorSignupFieldIsNull);
    return;
  }
  let id = params.id;
  delete params.id;
  models
    .update(params, {
      where: {
        id: id,
        status: status,
      },
    })
    .then((results) => {
      if (results[0] == 0) {
        let errorNotFound = errorProvider.errorNotFound;
        errorNotFound.message = errorNotFound.message.replace(
          "{1}",
          forTable.trim()
        );
        res.status(200).json(errorNotFound);
      } else {
        let updateSuccessful = errorProvider.updateSuccessful;
        updateSuccessful.message = updateSuccessful.message.replace(
          "{1}",
          forTable.trim()
        );
        res.status(200).json(updateSuccessful);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(errorProvider.APIErrorServer);
    });
};
