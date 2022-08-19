const { faker } = require("@faker-js/faker");
const models = require("../models");
module.exports = () => {
  var cookingMethod = [
    "Grilling",
    "Steaming",
    "Searing",
    "Boiling",
    "Sautéing",
    "Poaching",
    "Broiling",
    "Baking",
    "Roasting",
    "Blanching",
    "Stewing",
    "Deep-frying",
    "Braising",
    "Shallow-frying",
    "Barbecue",
  ];
  for (let i = 0; i < cookingMethod.length; i++) {
    var cookingMethods = {
      name: cookingMethod[i],
    };
    models.CookingMethods.create(cookingMethods).then((result) => {});
  }
};
