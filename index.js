const express = require('express')

const app = express()

const mysql = require("mysql")

var con = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    port:process.env.MYSQLPORT,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/Login", (req,res) =>{

    res.send("helloworld");

})

app.listen(8000)