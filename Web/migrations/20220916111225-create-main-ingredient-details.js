"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("MainIngredientDetails", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            food_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            main_ingredient_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("MainIngredientDetails");
    },
};
