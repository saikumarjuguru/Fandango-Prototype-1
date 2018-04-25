let mysql = require('mysql');

var pool = mysql.createPool({
        connectionLimit: 100, //important
        host     : 'fandangoinstance.cbvajauho28z.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'password',
        database: "fandango"
    });
module.exports = pool;
