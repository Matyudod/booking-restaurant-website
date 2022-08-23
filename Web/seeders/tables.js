const models = require("../models");
const { faker } = require("@faker-js/faker");
module.exports = (count) => {
    for (let i = 0; i < count; i++) {
        var table = {
            name: "Table " + (i + 1),
            number_of_seat: i > count / 2 ? 8 : 4,
        };
        models.Tables.create(table).then((result) => {});
    }
};
