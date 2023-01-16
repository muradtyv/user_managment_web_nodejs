const mysql = require("mysql")

//Connection Pool
const pool = mysql.createPool({
    connectionLimit:100,
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

        if (!err) {
            res.render("home", { result });
        } else {
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

//find user by search
exports.find = (req, res) => {

    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    let searchTerm = req.body.search;

    // User the connection
    pool.query("SELECT * FROM users where first_name like ? or last_name like ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"], (err, result) => {
        // connection.release();

        if (!err) {
            res.render("home", { result });
        } else {
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

exports.form = (req, res) => {
    res.render("add-user");
}

exports.create = (req, res) => {
    // res.render("add-user");

    const { first_name, last_name, email, comments } = req.body;

    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    // let searchTerm = req.body.search;

    // User the connection
    pool.query("INSERT INTO users SET first_name = ?, last_name = ?, email = ?, comments = ?",
        [first_name, last_name, email, comments], (err, result) => {
            // connection.release();

            if (!err) {
                res.render("add-user");
            } else {
                console.log(err)
            }
            console.log("the data from user table: \n", result);
        });
}


exports.edit = (req, res) => {
    // res.render("edit-user");
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    // User the connection
    pool.query("SELECT * FROM users where id = ?", [req.params.id], (err, result) => {
        // connection.release();

        if (!err) {
            res.render("edit-user", { result });
        } else {
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

exports.update = (req, res) => {
    const { first_name, last_name, email, comments } = req.body;
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    // User the connection
    pool.query("UPDATE users SET first_name = ?, last_name = ?,email = ?, comments = ? where id = ?", [first_name, last_name, email, comments, req.params.id], (err, result) => {
        // connection.release();

        if (!err) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                console.log("Connected as ID " + connection.threadId)
            });

            // User the connection
            pool.query("SELECT * FROM users where id = ?", [req.params.id], (err, result) => {
                // connection.release();

                if (!err) {
                    res.render("edit-user", { result });
                } else {
                    console.log(err)
                }
                console.log("the data from user table: \n", result);
            });
        } else {
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

exports.delete = (req, res) => {
    // res.render("edit-user");
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    // User the connection
    pool.query("DELETE FROM users where id = ?", [req.params.id], (err, result) => {
        // connection.release();

        if (!err) {
            // res.render("home", { result });
            res.redirect("/");
        } else {
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}

exports.viewuser = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as ID " + connection.threadId)
    });

    // User the connection
    pool.query("SELECT * FROM users where id = ?",[req.params.id], (err, result) => {
        // connection.release();

        if (!err) {
            res.render("view-user", { result });
        } else {
            console.log(err)
        }
        console.log("the data from user table: \n", result);
    });
}