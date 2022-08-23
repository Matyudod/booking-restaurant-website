"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Foods", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cooking_method_id: {
                allowNull: false,
                references: { model: "CookingMethods", key: "id" },
                type: Sequelize.INTEGER,
            },
            food_group_id: {
                allowNull: false,
                references: { model: "FoodGourps", key: "id" },
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            image_url: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                defaultValue: true,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("Foods");
    },
};
