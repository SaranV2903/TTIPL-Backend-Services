"use strict";
const env = process.env.NODE_ENV || "local";
const config = require(__dirname + "/../common/config.json")[env];
const mysql = require("mysql2");

const dbConn = mysql.createPool({
  connectionLimit: 100,
  multipleStatements: true,
  waitForConnections: true,
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
});

const closeConnection = (connection) => {
  return connection.destroy();
};

module.exports = {
  dbConn,
  closeConnection,
};
