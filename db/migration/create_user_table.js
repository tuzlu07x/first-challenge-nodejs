import dotenv from "dotenv";
const mysql = (await import("mysql2")).default;

const result = dotenv.config();
let connection = mysql.createConnection({
  host: result.parsed.MYSQL_CONNECTION,
  user: result.parsed.MYSQL_USER,
  password: result.parsed.MYSQL_PASSWORD,
  database: result.parsed.MYSQL_DATABASE,
});

let sql = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

connection.connect(function (err) {
  if (err) throw err;
  connection.connect(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
