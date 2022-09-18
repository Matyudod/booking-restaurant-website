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
const foodService = new FoodService(models);
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
                let detailBill = await orderService.getListWithTicketID(bill.ticket_id);
                if (detailBill != null && detailBill.length > 0) {
                    let sum_total = 0;
                    let food;
                    await detailBill.forEach(async (detail) => {
                        food = await foodService.getById(detail.food_id);
                        if (food != null) {
                            sum_total += food.price * detail.quatity;
                        } else {
                            res.status(500).json(message.APIErrorServer);
                            return;
                        }
                    });
                    bill.sum_total = sum_total;
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
