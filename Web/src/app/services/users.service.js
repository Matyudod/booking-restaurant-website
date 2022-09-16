const bcrypt = new require("bcrypt");
class UserService {
    constructor(models) {
        this.model = models.Users;
    }

    async create(data) {
        try {
            let [user, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return user;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let user = await this.model.find({ where: { id: id, status: true } });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getByName(name) {
        try {
            let user = await this.model.find({ where: { name: name, status: true } });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getByUsername(username) {
        try {
            let user = await this.model.find({ where: { username: username, status: true } });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getByUserLogin(username, password) {
        try {
            let user = await this.model.find({
                where: { username: username, password: password, status: true },
            });
            if (user != null) {
                let isCompare = await bcrypt.compare(password, user.password);
                if (isCompare) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async getList(is_admin, pagination, order) {
        try {
            let status = true;
            let list = await this.model.findAndCountAll({
                where: {
                    is_admin: is_admin,
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

module.exports = UserService;
