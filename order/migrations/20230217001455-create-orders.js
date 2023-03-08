/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      customerCpf: {
        type: Sequelize.STRING,
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      orderItems: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      status: {
        allowNull: false,
        defaultValue: 'REALIZADO',
        type: Sequelize.STRING,
      },
      links: {
        allowNull: true,
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('Orders');
  },
};
