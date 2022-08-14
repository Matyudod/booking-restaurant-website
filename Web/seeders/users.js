const models = require("../models")
const { faker } = require('@faker-js/faker')
const bcrypt = new require('bcrypt');
module.exports = (count)=>{
    for(let i = 0 ; i < count ; i++){
        var user = {
            name: faker.name.fullName(),
            username: faker.internet.userName(),
            password: bcrypt.hashSync(faker.internet.password(),10),
            email: faker.internet.email(),
            birthday: faker.date.birthdate({ min: 1950, max: 2010, mode: 'year' }).toISOString().split('T')[0],
            is_admin: (Math.random() < 0.1)
        }
        models.Users.create(user).then(result => {});
    }
}