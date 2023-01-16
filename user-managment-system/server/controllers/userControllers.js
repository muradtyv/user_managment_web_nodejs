const mysql = require("mysql")

//Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// view users
exports.view = (req, res) => {
    
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    // User the connection
    pool.query("SELECT * FROM users", (err, result) => {
        // connection.release();

        if(!err){
            res.render("home", { result });
        }else{
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

//find user by search
exports.find =(req, res) =>{

      //Connect to DB
      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    let searchTerm = req.body.search;

    // User the connection
    pool.query("SELECT * FROM users where first_name like ? or last_name like ?",  ["%" + searchTerm + "%","%" + searchTerm + "%"], (err, result) => {
        // connection.release();

        if(!err){
            res.render("home", { result });
        }else{
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

exports.form =(req, res) =>{
    res.render("add-user");
}

exports.create =(req, res) => {
    // res.render("add-user");

    const {first_name, last_name,email, phone, comments} = req.body;

      //Connect to DB
      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    let searchTerm = req.body.search;

    // User the connection
    pool.query("insert into users set first_name = ?, last_name = ?",[first_name, last_name], (err, result) => {
        // connection.release();

        if(!err){
            res.render("add-user");
        }else{
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}
