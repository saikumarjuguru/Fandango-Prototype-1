let mysql = require('mysql');

var pool = mysql.createPool({
        connectionLimit: 100, //important
        host: "localhost",
        user: "root",
        password: "",
        database: "fandango"
    });
module.exports = pool;
