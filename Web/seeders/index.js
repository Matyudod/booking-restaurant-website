const users = require("./users");

module.exports = (count) => {
    users(count * 3);
};
