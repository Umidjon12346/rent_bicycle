const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Owner = require("./owner.model");
const Category = require("./category.model");

const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

Product.belongsTo(Owner,{foreignKey:"owner_id"})
Owner.hasMany(Product)

Product.belongsTo(Category,{foreignKey:"category_id"})
Category.hasMany(Product)

module.exports = Product;