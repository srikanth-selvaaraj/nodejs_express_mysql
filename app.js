const express  = require("express");
const exphbs   = require("express-handlebars");
const bodyParser = require("body-parser");
//const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static files
app.use(express.static("public"));

//Template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");


/*
//DB connection
const con = mysql.createPool({
    connectionLimit:10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

//Check Connectioin
con.getConnection((err,connection)=>{
    if(err) throw err
    console.log("Connection Success")
});

app.get('/',(req,res)=>{
    res.render("home")
});
*/

const routes = require("./server/routes/students")
app.use('/',routes);
//app.get('/addusers',routes);
//app.post('/addusers',routes);
//app.get('/edituser',routes);
//app.get('/deleteuser',routes);

//listen port
app.listen(port,()=>{
    console.log("Listening Port: "+port);
});