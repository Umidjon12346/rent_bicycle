const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./product.model");
const Client = require("./client.model");


const Location = sequelize.define("location", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });


Location.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Location, { foreignKey: "product_id" });

Location.belongsTo(Client, { foreignKey: "client_id" });
Client.hasMany(Location,{ foreignKey: "client_id" })

module.exports = Location;

