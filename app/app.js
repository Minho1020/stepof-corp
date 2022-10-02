"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

dotenv.config();
const app = express();

const options = {
    host: "stepof-db.cvsvhcqoviuf.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    user: "stepof",
    password:"stepof1020",
    database: "stepof",
};
const sessionStore = new MySQLStore(options);

app.use(session({
    secret: "userInfo",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));

const home = require("./src/routes/home.js");
const admin = require("./src/routes/admin.js");


app.set("views","./src/views");
app.set("view engine","ejs");
app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use("/",home); 
app.use("/admin",admin); 


module.exports = app;