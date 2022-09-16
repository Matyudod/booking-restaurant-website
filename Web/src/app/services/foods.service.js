class FoodService {
    constructor(models) {
        this.model = models.Foods;
    }

    async create(data) {
        try {
            let [food, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return food;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        let status = true;
        try {
            let food = await this.model.find({ where: { id: id , status: status} });
            return food;
        } catch (err) {
            return null;
        }
    }
    
    async getList(pagination, order) {
        try {
            let status = true;
            let list = await this.model.findAndCountAll({
                where: {
                    status: status,
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
            let isUpdated = await this.model.update({ status: status }, { where: { id: id } });
            if (isUpdated) {
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

module.exports = FoodService;
