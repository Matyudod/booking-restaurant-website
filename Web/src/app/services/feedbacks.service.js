class FeedbackService {
    constructor(models) {
        this.model = models.Feedbacks;
    }

    async create(data) {
        try {
            let [feadback, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return feadback;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let feadback = await this.model.findOne({ where: { id: id } });
            return feadback;
        } catch (err) {
            return null;
        }
    }

    async getByCommentId(comment_id) {
        try {
            let feadback = await this.model.findOne({
                where: { comment_id: comment_id },
            });
            return feadback;
        } catch (err) {
            return null;
        }
    }

    async getByAdminId(admin_id) {
        try {
            let feadback = await this.model.findOne({ where: { admin_id: admin_id } });
            return feadback;
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

module.exports = FeedbackService;
