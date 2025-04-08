const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Client = require("./client.model");

const Card = sequelize.define(
  "card",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    card_type: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Card.belongsTo(Client,{foreignKey:"client_id"});
Client.hasMany(Card, { foreignKey: "client_id" });

module.exports = Card;