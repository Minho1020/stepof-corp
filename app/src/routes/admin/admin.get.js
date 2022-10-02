"use strict";

const output = {
    main: (req, res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/main')
        } else {
            res.redirect("/admin/login")
        }  
    },
    login: (req,res) => {
        res.render('admin/login')
    },
    service: (req, res) => {
        res.render("admin/service");
    },
    news: (req, res) => {
        res.render("admin/news");
    },
    newsAdd: (req, res) => {
        res.render("admin/newsAdd");
    },
    history: (req, res) => {
        res.render("admin/history");
    },
};

module.exports = {
    output,
};

