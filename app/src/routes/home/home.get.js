"use strict";

const homeDatastorage = require("../../models/home/homeDatastorage");

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
    history: async (req, res) => {
        const data = await homeDatastorage.getHistoriesInfo();
        var history2021 = "";
        var history2022 = "";
    for(const i of data) {
            const card = `
            <div class="story-card">
                <div class="story-icon" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-duration="500"><i class="fa-solid fa-shoe-prints"></i></div>
                <div class="story-content"data-aos="fade-left" data-aos-duration="800">
                    <div class="story-date">${i.historyDate.slice(5,7) + "월" + " " + i.historyDate.slice(8,10) + "일"}</div>
                    <a href="${i.historyURL}" class="story-title">${i.historyContent}<span class="title-line"></span></a>
                </div>
            </div>
            `;
            if(i.historyDate.slice(0,4) === "2022") {
                history2022 += card;
            } else if(i.historyDate.slice(0,4) === "2021") {
                history2021 += card;
            }
        };
        res.render("home/history", {
            history2022 : history2022,
            history2021 : history2021,
        });
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