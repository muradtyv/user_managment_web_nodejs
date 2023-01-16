const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.eventNames.PORT || 8080;

//pariasng middlewarw
app.use(bodyParser.urlencoded({ extended: false }));

//parse app/json
app.use(bodyParser.json());

// static file
app.use(express.static("public"));

//template engine 
// app.engine('hbs', require('hbs').__express);
// app.set('view engine', 'hbs');
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

//Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Connect to DB
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId)
});


//Router
const routes = require("./server/routes/users");
app.use("/", routes);




app.listen(port, () => console.log("listening on port : " + port))
