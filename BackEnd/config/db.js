const mysql = require ("mysql2/promise");

const client = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "senai"
});

module.exports = client;