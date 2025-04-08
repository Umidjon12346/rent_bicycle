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
    type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
    defaultValue: "pending",
  },
});

Product.belongsTo(Owner,{foreignKey:"owner_id"})
Owner.hasMany(Product, { foreignKey: "owner_id" });

Product.belongsTo(Category,{foreignKey:"category_id"})
Category.hasMany(Product, { foreignKey: "category_id" });

module.exports = Product;