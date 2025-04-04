const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Client = require("./client.model");
const Product = require("./product.model");

const Review = sequelize.define("review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Review.belongsTo(Client, { foreignKey: "client_id" });
Client.hasMany(Review)

Review.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Review)

module.exports = Review;