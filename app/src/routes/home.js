"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home/home.ctrl");
const get = require("./home/home.get");

router.get("/", get.output.main)
router.get("/business", get.output.business)
router.get("/service", get.output.service)
router.get("/history", get.output.history)
router.get("/news", get.output.news)
router.get("/recruit", get.output.recruit)

router.get("/news/:page", get.output.newsPage)


module.exports = router;