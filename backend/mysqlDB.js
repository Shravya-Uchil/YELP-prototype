var mysql = require("mysql");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Mysqlpwd123",
  database: "yelp",
  insecureAuth: true,
});

connection.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
});

module.exports = connection;
