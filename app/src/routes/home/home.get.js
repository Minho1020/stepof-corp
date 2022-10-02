"use strict";

const output = {
    main: (req, res) => {
        res.render("home/main");
    },
    business: (req, res) => {
        res.render("home/business");
    },
    service: (req, res) => {
        res.render("home/service");
    },
    history: (req, res) => {
        res.render("home/history");
    },
    news: (req, res) => {
        res.render("home/news");
    },
    recruit: (req, res) => {
        res.render("home/recruit");
    },
    newsPage: (req, res) => {
        
    }
};

module.exports = {
    output,
};