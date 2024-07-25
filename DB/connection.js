const mysql = require("mysql")
// var con = mysql.createConnection({
//     host: process.env.MYSQLHOST,
//     user: process.env.MYSQLUSER,
//     port:process.env.MYSQLPORT,
//     password: process.env.MYSQLPASSWORD,
//     database: process.env.MYSQLDATABASE
//
// });
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:'3306',
    password: '',
    database: 'myhandler'

});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});