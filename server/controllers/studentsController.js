const mysql = require('mysql');

//DB connection
const con = mysql.createPool({
    connectionLimit:10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

//Read
exports.view=(req,res)=>{
    //Check Connectioin
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});
            }else{
                console.log("Error in listing data"+err)
            }
        });
    });
};


//route to addusers page
exports.addusers=(req,res)=>{
    res.render("addusers");
}

//save the date
exports.save=(req,res)=>{
    //Check Connectioin
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,age,city} = req.body;
        connection.query("insert into users (NAME,AGE,CITY) values (?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("addusers",{msg:"Added successfully"});
            }else{
                console.log("Error in listing data"+err)
            }
        });
    });
};

//route to edituser page
exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        //GET ID from url
        let id = req.params.id;
        connection.query("select * from users where ID = ?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("editusers",{rows});
            }else{
                console.log("Error in listing data"+err)
            }
        });
    });
}

//Update the user
exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,age,city} = req.body;
        let id = req.params.id;
        connection.query("update users set NAME=?,AGE=?,CITY=? where id = ?",[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
                con.getConnection((err,connection)=>{
                    if(err) throw err
                    //GET ID from url
                    let id = req.params.id;
                    connection.query("select * from users where ID = ?",[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render("editusers",{rows,msg:"User Details Saved"});
                        }else{
                            console.log("Error in listing data"+err)
                        }
                    });
                });
            }else{
                console.log("Error in listing data"+err)
            }
        });
    });
}

//delete records
exports.deleteuser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id = req.params.id;
        connection.query("Delete from users where id =?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }
            else{
                console.log("Error in listing data"+err)
            }
        });
    });
}