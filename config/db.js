const { Pool } = require("pg");
const config = require("config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.get("db_name"),
  config.get("db_username"),
  config.get("db_password"),
  {
    host: "localhost",
    dialect: "postgres",
    logging: true,
    host: config.get("db_host"),
    port: config.get("db_port"),
  }
);
module.exports = sequelize;
