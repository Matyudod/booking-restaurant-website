const models = require("../../../models");
const message = require("../businesses/message-handler");
const generateBillId = require("../businesses/generate-bill_id");
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

const billService = new BillService(models);
const orderService = new OrderService(models);
const ticketService = new TicketService(models);
const foodService = new FoodService(models);
const userService = new UserService(models);
const typeOfPartyService = new TypeOfPartyService(models);
const tableService = new TableService(models);
const discountService = new DiscountService(models);
class BillController {
    async create(req, res) {
        try {
            let bill = {
                bill_number: generateBillId(),
                ticket_id: parseInt(req.body.ticket_id),
                admin_id: parseInt(req.body.admin_id),
                discount_id: parseInt(req.body.discount_id),
                status: true,
            };
            const v = new Validator();
            let validationResponse = v.validate(bill, scheme.billCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let detailBill = await orderService.getSumTotalOfTicket(bill.ticket_id);
                bill.sum_total = parseInt(detailBill[0].sum_total);
                let newBill = await billService.create(bill);
                if (newBill != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "Bill");
                    res.status(200).json({
                        data: newBill,
                        message: error,
                    });
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListWithCustomerId(req, res) {
        try {
            let customer_id = req.params.customer_id ?? -1;
            let ticketCustomerId = {
                customer_id: parseInt(customer_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(ticketCustomerId, scheme.customerIdValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticketList = await ticketService.getListWithCustomerID(
                    ticketCustomerId.customer_id
                );
                if (ticketList != null) {
                    let billList = [];
                    await ticketList.forEach(async (ticket) => {
                        let bill = await billService.getByTicketId(ticket.id);
                        billList.push(bill);
                    });
                    res.status(200).json(billList);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Bill");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListPendingOfCustomer(req, res) {
        try {
            let customer_id = req.params.customer_id ?? -1;
            let ticketCustomerId = {
                customer_id: parseInt(customer_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(ticketCustomerId, scheme.customerIdValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticketList = await ticketService.getListPendingOfCustomer(
                    ticketCustomerId.customer_id
                );
                if (ticketList != null) {
                    let billList = [];
                    await ticketList.forEach(async (ticket) => {
                        let bill = await billService.getByTicketId(ticket.id);
                        billList.push(bill);
                    });
                    res.status(200).json(billList);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Bill");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async isPaid(req, res) {
        try {
            let id = req.params.id ?? -1;
            let ticketId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(ticketId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let bill = await billService.getByTicketId(ticketId.id);
                res.status(200).json(bill);
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async detail(req, res) {
        try {
            let id = req.params.id ?? -1;
            let billId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(billId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let bill = await billService.getById(billId.id);
                if (bill != null) {
                    let ticket = await ticketService.getById(bill.ticket_id);
                    let orderList = await orderService.getListWithTicketID(bill.ticket_id);
                    let adminInfo = await userService.getById(bill.admin_id);
                    let discount = await discountService.getById(bill.discount_id);
                    if (
                        ticket != null &&
                        orderList != null &&
                        discount != null &&
                        adminInfo != null
                    ) {
                        let foodList = [];
                        await orderList.forEach(async (order) => {
                            foodList.push({
                                food: await foodService.getById(order.food_id),
                                quatity: order.quatity,
                            });
                        });
                        let customerInfo = await userService.getById(ticket.customer_id);
                        let typeOfPartyInfo = await typeOfPartyService.getById(
                            ticket.type_party_id
                        );
                        let tableInfo = await tableService.getById(ticket.table_id);

                        delete ticket.customer_id;
                        delete ticket.type_party_id;
                        delete ticket.table_id;
                        ticket.customer_info = customerInfo;
                        ticket.type_of_party_info = typeOfPartyInfo;
                        ticket.table_info = tableInfo;

                        delete bill.ticket_id;
                        delete bill.admin_id;
                        delete bill.discount_id;
                        bill.discount = discount;
                        bill.admin_info = adminInfo;
                        bill.order_list = foodList;
                        bill.ticket = ticket;

                        res.status(200).json(bill);
                    } else {
                        res.status(500).json(message.APIErrorServer);
                    }
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Bill");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id ?? -1;
            let billId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(billId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await billService.delete(billId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Bill");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "Bill");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async payment(req, res) {
        try {
            let id = req.params.id ?? -1;
            let billId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(billId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let bill = await billService.getById(billId.id);
                if (bill != null) {
                    let isPaid = await ticketService.payment(bill.ticket_id);
                    if (!isPaid) {
                        res.status(200).json(message.paidMessage);
                    } else {
                        res.status(500).json(message.APIErrorServer);
                    }
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new BillController();
