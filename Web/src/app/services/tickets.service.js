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

    async getListWithCustomerID(customer_id, pagination, order) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    customer_id: customer_id,
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

    async getListPendingOfCustomer(customer_id, pagination, order) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    customer_id: customer_id,
                    payment_date: null,
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

    async getList(pagination, order) {
        try {
            let list = await this.model.findAndCountAll({
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
