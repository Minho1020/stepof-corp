'use strict';

const adminUser = require("../../models/admin/adminuser"),
    adminHistory = require("../../models/admin/adminHistory");

const process = {
    login: async (req, res) => {
        const user = new adminUser(req.body);
        const response = await user.login();
        if(response.success) {
            req.session.admin_is_logined = true;
            req.session.admin_userid = req.body.id;
        }
        return res.json(response)
    },
    check: async (req, res) => {
        const user = new adminUser(req.body);
        const response = await user.login();
        return res.json(response);
    },
    newsAddSubmit: (req, res) => {
        console.log(req);
    },
    getHistories: async (req, res) => {
        const option = new adminHistory(req.body);
        const history = await option.getHistories();
        return res.json(history)
    },
    getHistory: async (req, res) => {
        const option = new adminHistory(req.body);
        const history = await option.getHistory();
        console.log(history)
        return res.json(history)
    },
    addHistory: async (req, res) => {
        const info = new adminHistory(req.body);
        const response = await info.addHistory();
        return res.json(response)
    },
    deleteHistory: async (req, res) => {
        const info = new adminHistory(req.body);
        const response = await info.deleteHistory();
        return res.json(response);
    },
    updateHistory: async (req, res) => {
        const info = new adminHistory(req.body);
        const response = await info.updateHistory();
        return res.json(response);
    }
}


module.exports = {
    process,
}