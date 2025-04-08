const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./product.model");
const RentDuration = require("./rentduration.model");
const Client = require("./client.model");
const Status = require("./status.model");

const Contract = sequelize.define("contract", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    duration_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });


Contract.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Contract, { foreignKey: "product_id" });

Contract.belongsTo(RentDuration, { foreignKey: "duration_id" });
RentDuration.hasMany(Contract, { foreignKey: "duration_id" });

Contract.belongsTo(Client,{foreignKey:"client_id"})
Client.hasMany(Contract, { foreignKey: "client_id" });

Contract.belongsTo(Status,{foreignKey:"status_id"})
Status.hasMany(Contract, { foreignKey: "status_id" });

module.exports = Contract;