"use strict";

const express = require("express");
const router = express.Router();
const admin_ctrl = require("./admin/admin.ctrl");
const admin_get = require("./admin/admin.get");

router.get("/", admin_get.output.main)
router.get("/login", admin_get.output.login)
router.get("/service", admin_get.output.service)
router.get("/news", admin_get.output.news)
router.get("/newsAdd", admin_get.output.newsAdd)
router.get("/history", admin_get.output.history)

router.post("/login", admin_ctrl.process.login)
router.post("/user/secure", admin_ctrl.process.check)
router.post("/newsAdd/submit", admin_ctrl.process.newsAddSubmit)
router.post("/history/gethistories", admin_ctrl.process.getHistories)
router.post("/history/gethistory", admin_ctrl.process.getHistory)
router.post("/history/addhistory", admin_ctrl.process.addHistory)
router.post("/history/deletehistory", admin_ctrl.process.deleteHistory)
router.post("/history/updatehistory", admin_ctrl.process.updateHistory)





module.exports = router;