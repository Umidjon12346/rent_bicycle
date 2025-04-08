const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OTP = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.STRING,
            primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = OTP;
