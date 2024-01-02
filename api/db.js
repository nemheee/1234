const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: 'localhost',
  database: 'pheonix',
  user: 'root',
  password: '12345',
});

module.exports = db;