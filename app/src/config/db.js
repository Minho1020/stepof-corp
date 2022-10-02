"use strict";

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "stepof-db.cvsvhcqoviuf.ap-northeast-2.rds.amazonaws.com",
    user: "stepof",
    password:"stepof1020",
    database:"stepof",
});

module.exports = db;