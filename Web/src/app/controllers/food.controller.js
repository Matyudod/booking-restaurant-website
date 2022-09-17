const models = require("../../../models");
const message = require("../businesses/messages");
const { writeFile } = require("fs");
require("dotenv").config();
const path = require("path");
const { Op } = require("sequelize");
const Validator = require("fastest-validator");
const scheme = require("../businesses/ValidationProviders");
const getList = require("../businesses/GetListSupporter");
const getOne = require("../businesses/GetOneSupporter");
const update = require("../businesses/UpdateSupporter");
const updateStatus = require("../businesses/UpdateStatusSuporter");

class FoodController {
    pagination(req, res) {
        getList(req.body, models.Foods, res);
    }
    get(req, res) {
        let id = req.params.id ?? -1;
        getOne(id, models.Foods, res, "Food", true);
    }
    create(req, res) {
        let image_upload = {
            url: req.body.url,
            file_base64: req.body.file_base64,
            is_url: req.body.is_url.toLowerCase() == "true",
        };
        let checkScheme = scheme.imageUploadValidation;
        if (image_upload.is_url) {
            checkScheme.file_base64 = checkScheme.file_base64 + "|optional";
        } else {
            checkScheme.url = checkScheme.url + "|optional";
        }
        const v = new Validator();
        let validationResponse = v.validate(image_upload, checkScheme);
        if (validationResponse !== true) {
            res.status(400).json(message.imageUploadError);
        } else {
            if (!image_upload.is_url) {
                image_upload.file_base64 = image_upload.file_base64.replace(
                    /^data:image\/(png|gif|jpeg);base64,/,
                    ""
                );
                let url = "";
                let image_name = "src/public/src/images/foods/" + req.body.name + ".png";
                writeFile(image_name, image_upload.file_base64, "base64", function (err) {
                    if (err) {
                        res.status(400).json(message.imageUploadError);
                    } else {
                        url = image_name.replace(
                            "src/public",
                            process.env.DEV_BACKEND_URL || "http://localhost/"
                        );
                    }
                });
            }

            let food = {
                cooking_method_id: parseInt(req.body.cooking_method_id),
                food_group_id: parseInt(req.body.food_group_id),
                name: req.body.name,
                price: parseInt(req.body.price),
                image: image_upload.is_url ? image_upload.url : url,
            };
            let validationResponse = v.validate(food, scheme.foodUpdateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                models.Foods.findOrCreate({
                    where: {
                        name: food.name,
                    },
                    default: food,
                })
                    .then((result, created) => {
                        if (created) {
                            let success_message = message.createSuccessful;
                            success_message.message.replace("{1}", "Food");
                            res.status(200).json(success_message);
                        } else {
                            let error_message = message.errorNotFound;
                            error_message.message.replace("{1}", "Food");
                            res.status(200).json(error_message);
                        }
                    })
                    .catch((err) => {
                        res.status(500).json(message.APIErrorServer);
                    });
            }
        }
    }
    update(req, res) {
        let image_upload = {
            url: req.body.url,
            file_base64: req.body.file_base64,
            is_url: req.body.is_url.toLowerCase() == "true",
        };
        let checkScheme = scheme.imageUploadValidation;
        if (image_upload.is_url) {
            checkScheme.file_base64 = checkScheme.file_base64 + "|optional";
        } else {
            checkScheme.url = checkScheme.url + "|optional";
        }
        const v = new Validator();
        let validationResponse = v.validate(image_upload, checkScheme);
        if (validationResponse !== true) {
            res.status(400).json(message.imageUploadError);
        } else {
            if (!image_upload.is_url) {
                image_upload.file_base64 = image_upload.file_base64.replace(
                    /^data:image\/(png|gif|jpeg);base64,/,
                    ""
                );
                let url = "";
                let image_name = "src/public/src/images/foods/" + req.body.name + ".png";
                writeFile(image_name, image_upload.file_base64, "base64", function (err) {
                    if (err) {
                        res.status(400).json(message.imageUploadError);
                    } else {
                        url = image_name.replace(
                            "src/public",
                            process.env.DEV_BACKEND_URL || "http://localhost/"
                        );
                    }
                });
            }

            let food = {
                id: parseInt(req.params.id),
                cooking_method_id: parseInt(req.body.cooking_method_id),
                food_group_id: parseInt(req.body.food_group_id),
                name: req.body.name,
                price: parseInt(req.body.price),
                image: image_upload.is_url ? image_upload.url : url,
            };
            update(food, scheme.foodUpdateValidation, models.Foods, res, "Food", true);
        }
    }
    delete(req, res) {
        let food = {
            id: req.params.id,
        };
        updateStatus(food, models.Foods, res, "Food", 0);
    }
}
module.exports = new FoodController();
