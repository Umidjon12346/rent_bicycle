const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Status = sequelize.define("status", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
    defaultValue: "pending",
  },
});


module.exports = Status;
