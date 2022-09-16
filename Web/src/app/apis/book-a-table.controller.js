const models = require("../../../models");
const errorProvider = require("../businesses/ErrorProviders");
const { Op } = require("sequelize");
const Validator = require("fastest-validator");
const scheme = require("../businesses/ValidationProviders");
const getList = require("../businesses/GetListSupporter");
const getOne = require("../businesses/GetOneSupporter");
const update = require("../businesses/UpdateSupporter");
const updateStatus = require("../businesses/UpdateStatusSuporter");

class BookATableController {
    bookAtable(req, res) {
        let bookingInfo = {
            customer_id: parseInt(req.body.customer_id),
            table_id: parseInt(req.body.table_id),
            received_date: new Date(),
        };
        const v = new Validator();
        let validationResponse = v.validate(bookingInfo, scheme.bookingInfoDtoValidation);
        if (validationResponse !== true) {
            res.status(400).json(errorProvider.errorSignupFieldIsNull);
        } else {
            models.BookATable.findOne({
                where: {
                    [Op.and]: [
                        { table_id: bookingInfo.table_id },
                        { received_date: { [Op.lte]: bookingInfo.received_date } },
                        { payment_date: { [Op.is]: null } },
                    ],
                },
            })
                .then((result) => {
                    if (result == null) {
                        models.BookATable.create(bookingInfo).then((result) => {
                            let table = {
                                id: bookingInfo.table_id,
                            };
                            updateStatus(table, models.Tables, res, "Table", 1);
                        });
                    } else {
                        res.status(400).json(errorProvider.errorTableBooked);
                    }
                })
                .catch((error) => {
                    res.status(500).json(errorProvider.APIErrorServer);
                });
        }
    }
}
module.exports = new BookATableController();