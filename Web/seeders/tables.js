const models = require("../models")
const { faker } = require('@faker-js/faker')
module.exports = (count)=>{
    for(let i = 0 ; i < count ; i++){
        var table = {
          name: "Table "+i
        }
        models.Tables.create(table).then(result => {});
    }
}