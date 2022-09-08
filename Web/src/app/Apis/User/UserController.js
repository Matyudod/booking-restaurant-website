const models = require("../../../../models");
const errorProvider = require("../../Businesses/ErrorProviders");
const createToken = require("../../Businesses/GetToken");
const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const scheme = require("../../Businesses/ValidationProviders");
const getOne = require("../../Businesses/GetOneSupporter");
const update = require("../../Businesses/UpdateSupporter");
const updateStatus = require("../../Businesses/UpdateStatusSuporter");
//status : 1 is active | 0 is removed
class UserController {
    loginHandler(req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password,
            status: true,
        };
        console.log(user);
        const v = new Validator();
        let validationResponse = v.validate(user, scheme.loginValidation);
        if (validationResponse !== true) {
            res.status(400).json(errorProvider.errorLoginFieldIsNull);
        } else {
            models.Users.findOne({
                where: {
                    username: user.username,
                    status: user.status,
                },
            })
                .then((result) => {
                    if (result != null) {
                        bcrypt.compare(user.password, result.password, async (err, correct) => {
                            if (correct) {
                                models.Users.update(
                                    {
                                        refreshToken: await createToken(user.username),
                                    },
                                    {
                                        where: {
                                            username: user.username,
                                            status: user.status,
                                        },
                                    }
                                ).then((result) => {
                                    models.Users.findOne({
                                        where: {
                                            username: user.username,
                                            status: user.status,
                                        },
                                    })
                                        .then((result) => {
                                            res.status(200).json({
                                                data: result,
                                                message: errorProvider.successLoginComplete,
                                            });
                                        })
                                        .catch((err) => {
                                            res.status(500).json(errorProvider.APIErrorServer);
                                        });
                                });
                            } else {
                                res.status(200).json(errorProvider.errorLoginFieldIncorrect);
                            }
                        });
                    } else {
                        let errorNotFound = errorProvider.errorNotFound;
                        errorNotFound.message = errorNotFound.message.replace("{1}", "User".trim());
                        res.status(200).json(errorNotFound);
                    }
                })
                .catch((error) => {
                    res.status(500).json(errorProvider.APIErrorServer);
                });
        }
    }

    async signupHandler(req, res) {
        let user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            birthday: new Date(req.body.birthday),
            is_admin: false,
            status: true,
            refreshToken: await createToken(req.body.username),
        };

        const v = new Validator();
        let validationResponse = v.validate(user, scheme.signupValidation);
        if (validationResponse !== true) {
            res.status(400).json(errorProvider.errorSignupFieldIsNull);
        } else {
            models.Users.findOne({
                where: {
                    username: user.username,
                    status: user.status,
                },
            })
                .then((result) => {
                    if (result == null) {
                        models.Users.create(user)
                            .then((result) => {
                                models.Users.findOne({
                                    where: {
                                        username: user.username,
                                        status: user.status,
                                    },
                                })
                                    .then((newUser) => {
                                        res.status(200).json({
                                            data: newUser,
                                            message: errorProvider.successSignupComplete,
                                        });
                                    })
                                    .catch((error) => {
                                        res.status(500).json(errorProvider.APIErrorServer);
                                    });
                            })
                            .catch((err) => {
                                res.status(500).json(errorProvider.APIErrorServer);
                            });
                    } else {
                        res.status(200).json(errorProvider.errorSignupUserExisted);
                    }
                })
                .catch((error) => {
                    res.status(500).json(errorProvider.APIErrorServer);
                });
        }
    }

    adminList(req, res) {
        let params = req.body;
        let status = true;
        let is_admin = true;
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

        models.Users.findAndCountAll({
            where: {
                is_admin: is_admin,
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
    }

    customerList(req, res) {
        let params = req.body;
        let status = true;
        let is_admin = false;
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

        models.Users.findAndCountAll({
            where: {
                is_admin: is_admin,
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
    }

    detail(req, res) {
        let id = req.params.id;
        getOne(id, models.Users, res, "User");
    }

    updateUserInfo(req, res) {
        let user = {
            id: parseInt(req.body.id),
            name: req.body.name,
            email: req.body.email,
            birthday: new Date(req.body.birthday),
        };
        update(user, scheme.userUpdateValidation, models.Users, res, "User", true);
    }

    deleteUser(req, res) {
        let user = {
            id: parseInt(req.params.id),
        };
        updateStatus(user, models.Users, res, "User", false);
    }
}
module.exports = new UserController();
