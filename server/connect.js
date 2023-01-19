import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

// export const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_books",
});
