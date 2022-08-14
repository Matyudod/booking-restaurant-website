'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookATables', {
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      table_id: {
        allowNull: false,
        references: { model: 'Tables', key: 'id' },
        type: Sequelize.INTEGER
      },
      received_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      payment_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookATables');
  }
};