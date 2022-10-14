class BillService {
    constructor(models) {
        this.model = models.Bills;
    }

    async create(data) {
        try {
            let [bill, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return bill;
            } else {
                return bill;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        let status = true;
        try {
            let bill = await this.model.findOne({ where: { id: id, status: status } });
            return bill;
        } catch (err) {
            return null;
        }
    }
    async getByTicketId(ticket_id) {
        try {
            let bill = await this.model.findOne({
                where: { ticket_id: ticket_id },
            });
            return bill;
        } catch (err) {
            return null;
        }
    }

    async getByAdminId(admin_id) {
        try {
            let bill = await this.model.findOne({ where: { admin_id: admin_id } });
            return bill;
        } catch (err) {
            return null;
        }
    }

    async getByDiscountId(discount_id) {
        try {
            let bill = await this.model.findOne({ where: { discount_id: discount_id } });
            return bill;
        } catch (err) {
            return null;
        }
    }

    async update(id, data) {
        let status = true;
        try {
            let isUpdated = await this.model.update(data, {
                where: { id: id, status: status },
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
        let status = false;
        try {
            let isRemoved = await this.model.update(
                { status: status },
                { where: { id: id, status: true } }
            );
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

module.exports = BillService;
