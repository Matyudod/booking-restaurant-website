'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookATable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookATable.init({
    customer_id: DataTypes.INTEGER,
    table_id: DataTypes.INTEGER,
    received_date: DataTypes.DATE,
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BookATable',
  });
  return BookATable;
};