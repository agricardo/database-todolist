const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'To_Do_List'
});

connection.connect();
module.exports = connection;