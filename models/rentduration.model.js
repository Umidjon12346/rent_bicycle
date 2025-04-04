const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RentDuration = sequelize.define("rent_duration", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    duration_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });


module.exports = RentDuration;

