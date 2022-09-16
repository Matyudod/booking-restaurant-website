class TableService {
    constructor(models) {
        this.model = models.Tables;
    }

    async create(data) {
        try {
            let [table, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return table;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let table = await this.model.find({ where: { id: id } });
            return table;
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
                where: { id: id },
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

module.exports = TableService;