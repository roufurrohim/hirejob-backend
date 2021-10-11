const express = require('express');
const { getAll, insert, getDetail } = require('../controller/portfolio.controller');
const upload = require("../middleware/upload")

const routerPortfolio = express.Router();

routerPortfolio
.get("/portfolio/:id", getAll)
.get("/portfolio-detail/:id", getDetail)
.post("/portfolio/:id", upload, insert)

module.exports = routerPortfolio