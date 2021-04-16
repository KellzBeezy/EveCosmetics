"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasOne(models.Orders, {
        foreignKey: "productId",
        onDelete: "cascade",
      });
    }
  }
  Product.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quantityOrdered: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capital: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      profit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "product",
      modelName: "Product",
    }
  );
  return Product;
};
