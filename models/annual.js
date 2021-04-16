"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Annual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Annual.init(
    {
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
    },
    {
      sequelize,
      tableName: "annual",
      modelName: "Annual",
    }
  );
  return Annual;
};
