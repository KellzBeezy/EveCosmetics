"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantityOrdered: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      profit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      remaining: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capital: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      revenue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    await queryInterface.dropTable("Products");
  },
};
