const models = require("../models")
const { faker } = require('@faker-js/faker')
module.exports = ()=>{
    var foodGourps = ["Hors d'oeuvres", "Amuse-bouche", "Soup", "Appetizer", "Salad", "Fish", "First main course", "Palate Cleanser", "Second main course", "Cheese course", "Dessert", "Mignardise"]
    for(let i = 0 ; i < foodGourps.length ; i++){
        var foodGourp = {
          name: foodGourps[i]
        }
        models.FoodGourps.create(foodGourp).then(result => {});
    }
}