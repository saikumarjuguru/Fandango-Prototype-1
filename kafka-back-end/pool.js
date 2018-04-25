let mysql = require('mysql');

var pool = mysql.createPool({
        connectionLimit: 100, //important
        host     : 'localhost',
          user     : 'root',
          password : '283229ansz',
        database: "fandango"
    });
module.exports = pool;
