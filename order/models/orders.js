const {
  Model, Sequelize,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
    }
  }
  Orders.init({
    customerId: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerCpf: DataTypes.STRING,
    deliveryAddress: DataTypes.JSON,
    orderItems: DataTypes.JSON,
    status: DataTypes.STRING,
    links: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
