var Sequelize = require("sequelize");
const Op = Sequelize.Op;
class TicketService {
    constructor(models) {
        this.model = models.Tickets;
    }

    async create(data) {
        try {
            let [ticket, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return ticket;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let ticket = await this.model.findOne({ where: { id: id } });
            return ticket;
        } catch (err) {
            return null;
        }
    }

    async getListOrderWithCustomerID(customer_id) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    customer_id: customer_id,
                    table_id: 0,
                    payment_date: {
                        [Op.not]: null,
                    },
                },
            });
            return list;
        } catch (err) {
            return null;
        }
    }

    async getListReservedWithCustomerID(customer_id) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    customer_id: customer_id,
                    table_id: {
                        [Op.ne]: 0,
                    },
                },
            });
            return list;
        } catch (err) {
            return null;
        }
    }

    async getPendingOfCustomer(customer_id) {
        try {
            let ticket = await this.model.findOrCreate({
                where: {
                    customer_id: customer_id,
                    payment_date: null,
                },
                defaults: {
                    type_party_id: 0,
                    table_id: 0,
                    received_date: new Date(),
                    customer_phone: "",
                    customer_address: "",
                },
            });
            return ticket[0];
        } catch (err) {
            return null;
        }
    }

    async getListOrder(pagination, order) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    table_id: 0,
                    payment_date: {
                        [Op.not]: null,
                    },
                },
                order: [order],
                limit: pagination.size,
                offset: (pagination.page - 1) * pagination.size,
            });
            list.page = pagination.page;
            list.size = pagination.size;
            return list;
        } catch (err) {
            return null;
        }
    }

    async getListReserveTable(pagination, order) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    table_id: {
                        [Op.ne]: 0,
                    },
                },
                order: [order],
                limit: pagination.size,
                offset: (pagination.page - 1) * pagination.size,
            });
            list.page = pagination.page;
            list.size = pagination.size;
            return list;
        } catch (err) {
            return null;
        }
    }

    async payment(id) {
        try {
            let data = {
                payment_date: new Date(),
            };
            let isUpdated = await this.model.update(data, {
                where: { id: id, payment_date: null },
            });
            if (isUpdated) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async update(id, data) {
        try {
            let isUpdated = await this.model.update(data, {
                where: { id: id, payment_date: null },
            });
            if (isUpdated) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async delete(id) {
        try {
            let isRemoved = await this.model.destroy({ where: { id: id } });
            if (isRemoved) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async clearData() {
        try {
            let isCleared = await this.model.destroy({
                truncate: true,
            });
            if (isCleared) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
}

module.exports = TicketService;
