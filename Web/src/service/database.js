const QueryBuilder = require('node-querybuilder');
require('dotenv').config()

const settings = {
    host: process.env.DB_HOST || "localhost",
    user:  process.env.DB_USER || "root",
    password:  process.env.DB_PASS || "",
    database:  process.env.DB_NAME || "booking-restaurant"
};
module.exports = new QueryBuilder(settings, 'mysql','pool');
 
