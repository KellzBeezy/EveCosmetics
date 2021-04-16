"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profit.init(
    {
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      capital: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      profit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "profit",
      modelName: "Profit",
    }
  );
  return Profit;
};
