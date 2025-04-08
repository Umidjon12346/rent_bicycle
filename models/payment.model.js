
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Client = require("./client.model");
const Contract = require("./contracts.model");

const Payment = sequelize.define("payment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      allowNull: false,
      defaultValue: "pending",
    },
  });


Payment.belongsTo(Client, { foreignKey: "client_id" });
Client.hasMany(Payment, { foreignKey: "client_id" });

Payment.belongsTo(Contract, { foreignKey: "contract_id" });
Contract.hasOne(Payment, { foreignKey: "contract_id" });



