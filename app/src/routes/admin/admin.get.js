"use strict";

const adminHistory = require("../../models/admin/adminHistory");


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
    history: async (req, res) => {
        // const order = req.query.order;
        // const setting = {
        //     order: order,
        // };
        // const option = new adminHistory(setting);
        // const history = await option.getHistories();
        // var history2021 = "";
        // var history2022 = "";
        // for(const i of history) {
        //     const card = `
        //     <div class="history-card" id="${i.historyId}">
        //         <div class="history-card-wrapper">
        //             <div class="history-card-content">
        //                 <div class="history-icon"><i class="fa-solid fa-shoe-prints"></i></div>
        //                 <div class="history-content">
        //                     <div class="history-date">${i.historyDate.slice(5,7) + "월" + " " + i.historyDate.slice(8,10) + "일"}</div>
        //                     <a href="${i.historyURL}" class="history-title">${i.historyContent}<span class="title-line"></span></a>
        //                 </div>
        //             </div>
        //             <div class="history-card-setting">
        //                 <div class="history-card-setting-right">
        //                     <div class="history-card-edit edit-btn"><i class="fa-solid fa-pen-to-square"></i></div>
        //                     <div class="history-card-delete delete-btn"><i class="fa-solid fa-trash-can"></i></div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     `;
        //     if(i.historyDate.slice(0,4) === "2022") {
        //         history2022 += card;
        //     } else if(i.historyDate.slice(0,4) === "2021") {
        //         history2021 += card;
        //     }
        // };
        // res.render("admin/history", {
        //     history2022 : history2022,
        //     history2021 : history2021,
        // });
        res.render("admin/history")
    },
};
module.exports = {
    output,
};

