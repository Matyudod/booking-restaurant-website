const Validator = require("fastest-validator");
const scheme = require("./ValidationProviders");
const models = require("../../../models");
module.exports = (req, res, next) => {
    try {
        const user = {
            token: req.headers.authorization,
        };
        const v = new Validator();
        let validationResponse = v.validate(pagination, scheme.pageValidation);
        if (validationResponse !== true) {
            res.status(401).json(errorProvider.authError);
        } else {
            models.Users.findOne({
                where: {
                    token: user.token,
                },
            })
                .then((result) => {
                    if (result != null) {
                        next();
                    } else {
                        res.status(401).json(errorProvider.authError);
                    }
                })
                .catch((error) => {
                    res.status(401).json(errorProvider.authError);
                });
        }
    } catch (error) {
        res.status(401).json(errorProvider.authError);
    }
};
