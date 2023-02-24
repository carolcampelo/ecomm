'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    
    static associate(models) {
      Payments.hasOne(models.Invoices, {
        foreignKey: 'paymentId'
      })
    }
  }
  Payments.init({
    totalPrice: DataTypes.DECIMAL,
    cardName: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    expDate: DataTypes.STRING,
    cvv: DataTypes.STRING,
    status: DataTypes.STRING,
    invoiceId: DataTypes.INTEGER,
    links: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};