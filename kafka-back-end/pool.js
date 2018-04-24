let mysql = require('mysql');

var pool = mysql.createPool({
        connectionLimit: 100, //important
        host     : 'localhost',
        user     : 'root',
        password : 'Hello@123',
        database: "fandango"
    });
module.exports = pool;
