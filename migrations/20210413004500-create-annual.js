"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Annual", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      initialProfit: {
        type: DataTypes.DECIMAL(10.2),
        allowNull: false,
      },
      currentProfit: {
        type: DataTypes.DECIMAL(10.2),
        allowNull: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Annual");
  },
};
