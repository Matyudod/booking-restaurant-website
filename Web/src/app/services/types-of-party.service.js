class TypeOfPartyService {
    constructor(models) {
        this.model = models.TypesOfParty;
    }

    async create(data) {
        try {
            let [type_of_party, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return type_of_party;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let type_of_party = await this.model.find({ where: { id: id } });
            return type_of_party;
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
        let status = true;
        try {
            let isUpdated = await this.model.update(data, { where: { id: id, status: status } });
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

module.exports = TypeOfPartyService;
