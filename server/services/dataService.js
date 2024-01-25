// services/dataService.js
const mysql = require("mysql");

// MySQL configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789asdF",
  database: "ppaw",
});

connection.connect();

const getData = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM category";
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getData,
};
