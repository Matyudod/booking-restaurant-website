"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bills", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bill_number: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            customer_id: {
                allowNull: false,
                references: { model: "Users", key: "id" },
                type: Sequelize.INTEGER,
            },
            admin_id: {
                allowNull: false,
                references: { model: "Users", key: "id" },
                type: Sequelize.INTEGER,
            },
            discount_id: {
                allowNull: true,
                references: { model: "Discounts", key: "id" },
                type: Sequelize.INTEGER,
            },
            sum_total: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            customer_address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            customer_phone_number: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                defaultValue: false,
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
        await queryInterface.dropTable("Bills");
    },
};
