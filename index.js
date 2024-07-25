const express = require('express')
const jwt = require('jsonwebtoken');
const app = express()
var md5 = require('md5');

require('dotenv').config()

const mysql = require("mysql")
var con = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    port:process.env.MYSQLPORT,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE

});
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     port:'3306',
//     password: '',
//     database: 'myhandler'
//
// });
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.urlencoded({ extended: true }));

app.post("/Login", async  (req,res) =>{

    const {email,password} = req.body;

    if(!email || !password){

        return res.json({ error: "1", msg: "please fill all the fields!" });

    }else{

        con.query('select * from user where email=? and password=?', [email,password], (err,result) =>{

            if(err) throw err;


            if(result.length > 0){
                let x = result[0].id;

                return res.json({ error: "0", msg: x });

            }else{
                return res.json({ error: "1", msg: "Wrong credentials!" });
            }

        });


    }

})


app.post("/Register", (req,res) =>{

    const {email,password} = req.body;

    if(!email || !password){

        return res.json({ error: "1", msg: "please fill all the fields!" });

    }else {

        con.query("select * from user where email = ?", [email], (err,result) =>{

            if(err) throw err;


            if(result === []){

                let r = (Math.random() + 1).toString(36).substring(1);
                r = md5(r);

                con.query("insert into user (id,password,email) values (?,?,?)", [r,email,password], (err) =>{

                    if(err) throw err;

                    return res.json({error:'0', msg:r});

                })

            }else{
                return res.json({error:'1', msg:''+email+' has already been registred with us.</br>Please try another email or login.'});
            }

        })
    }


})


app.post("/getHandles", (req,res) =>{

    const id = req.body;
    if(!id){

        return res.json({ error: "1", msg: "you are logged out!" });

    }else {

        con.query('select * from handles where id=?',[id.id], (err,result) =>{

            if(err) throw err;

            console.log(result);

            if(result.length > 0){


                return res.json({ error: "0", msg: result });

            }else{
                return res.json({ error: "1", msg: "Wrong credentials!" });
            }

        });

    }

})


app.post("/addHandles", (req,res) =>{

    const {id,social,url} = req.body;

    if(!id || !social || !url){

        return res.json({ error: "1", msg: "please fill all the fields!" });

    }else {

        con.query("insert into handles (id,social,url) values (?,?,?)", [id,social,url], (err) =>{

            if(err) throw err;

            return res.json({error:'0', msg: "handle added successfully!"});

        })


    }

})







app.listen(process.env.PORT)