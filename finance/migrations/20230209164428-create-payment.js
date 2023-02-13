'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      cardName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cardNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expDate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cvv: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        defaultValue: "CRIADO",
        type: Sequelize.STRING
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
    await queryInterface.dropTable('');
  }
};