const models = require("../../../models");
const errorProvider = require("../businesses/error-handler");
const createToken = require("../businesses/generate-jwt");
const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const scheme = require("../businesses/validation-handler");
const {
    UserService,
    TypeOfPartyService,
    TicketService,
    TableService,
    OrderService,
    MainIngredientDetailService,
    MainIngredientService,
    FoodService,
    FeedbackService,
    DiscountService,
    CommentService,
    BillService,
} = require("../services/index.service");

const userService = new UserService(models);
class UserController {
    async loginHandler(req, res) {
        try {
            let user = {
                username: req.body.username,
                password: req.body.password,
                status: true,
            };
            const v = new Validator();
            let validationResponse = v.validate(user, scheme.loginValidation);
            if (validationResponse !== true) {
                res.status(400).json(errorProvider.errorLoginFieldIsNull);
            } else {
                let userId = await userService.getIdByUserLogin(user.username, user.password);
                if (userId != null) {
                    let newToken = {
                        refreshToken: await createToken(user.username),
                    };
                    if ((await userService.update(userId, newToken)) == false) {
                        res.status(500).json(errorProvider.APIErrorServer);
                    }
                    let userLoginInfo = await userService.getById(userId);
                    if (userLoginInfo == null) {
                        res.status(500).json(errorProvider.APIErrorServer);
                    } else {
                        res.status(200).json({
                            data: userLoginInfo,
                            message: errorProvider.successLoginComplete,
                        });
                    }
                } else {
                    let errorNotFound = errorProvider.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "User".trim());
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(errorProvider.APIErrorServer);
        }
    }

    async signupHandler(req, res) {
        try {
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
                let isHaveUser = await userService.getByUsername(user.username);
                if (isHaveUser == null) {
                    let newUser = await userService.create(user);
                    if (newUser != null) {
                        res.status(200).json({
                            data: newUser,
                            message: errorProvider.successSignupComplete,
                        });
                    } else {
                        res.status(500).json(errorProvider.APIErrorServer);
                    }
                } else {
                    res.status(200).json(errorProvider.errorSignupUserExisted);
                }
            }
        } catch (error) {
            res.status(500).json(errorProvider.APIErrorServer);
        }
    }

    async adminList(req, res) {
        let params = req.body;
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
        } else {
            let adminList = await userService.getList(is_admin, pagination, order);
            if (adminList != null) {
                res.status(200).json(adminList);
            } else {
                res.status(500).json(errorProvider.APIErrorServer);
            }
        }
    }

    async customerList(req, res) {
        let params = req.body;
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
        } else {
            let customerList = await userService.getList(is_admin, pagination, order);
            if (customerList != null) {
                res.status(200).json(customerList);
            } else {
                res.status(500).json(errorProvider.APIErrorServer);
            }
        }
    }

    async detail(req, res) {
        try {
            let id = req.params.id;
            let userId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(userId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(errorProvider.errorIdFieldIsNull);
            } else {
                let userInfo = await userService.getById(userId.id);
                if (userInfo != null) {
                    res.status(200).json(userInfo);
                } else {
                    let error = errorProvider.errorNotFound;
                    error.message = error.message.replace("{1}", "User");
                    res.status(400).json(errorProvider.errorNotFound);
                }
            }
        } catch (error) {
            res.status(500).json(errorProvider.APIErrorServer);
        }
    }

    async updateUserInfo(req, res) {
        try {
            let user = {
                id: parseInt(req.body.id),
                name: req.body.name,
                email: req.body.email,
                birthday: new Date(req.body.birthday),
            };

            const v = new Validator();
            let validationResponse = v.validate(user, validate);
            if (validationResponse !== true) {
                res.status(400).json(errorProvider.errorSignupFieldIsNull);
            } else {
                let id = user.id;
                delete user.id;
                let isUpdated = await userService.update(id, user);
                if (!isUpdated) {
                    let errorNotFound = errorProvider.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "user");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = errorProvider.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace("{1}", "user");
                    res.status(200).json(updateSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(errorProvider.APIErrorServer);
        }
    }

    async deleteUser(req, res) {
        try {
            let id = req.params.id;
            let userId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(userId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(errorProvider.errorIdFieldIsNull);
            } else {
                let isDeleted = await userService.delete(userId.id);
                if (!isDeleted) {
                    let errorNotFound = errorProvider.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "User");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = errorProvider.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "User");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(errorProvider.APIErrorServer);
        }
    }
}
module.exports = new UserController();
