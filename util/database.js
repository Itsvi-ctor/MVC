// ! Using sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Rijjt51mm@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize

// ! MySQL code
/* 
const mysql = require("mysql2")

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"node-complete",
    password:"Rijjt51mm@",
})

module.exports = pool.promise()
*/
