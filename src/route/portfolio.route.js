const express = require('express');
const { getAll, insert, getDetail, update, deletePortfolio } = require('../controller/portfolio.controller');
const authentic = require("../middleware/authentication")
const upload = require("../middleware/upload")

const routerPortfolio = express.Router();

routerPortfolio
.get("/portfolio/:id", getAll)
.get("/portfolio-detail/:id", getDetail)
.post("/portfolio/:id", upload, insert)
.put("/portfolio/:id",upload, update)
.delete("/portfolio/:id", deletePortfolio)

module.exports = routerPortfolio