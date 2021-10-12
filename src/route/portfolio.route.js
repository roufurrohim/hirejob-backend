const express = require('express');
const { getAll, insert, getDetail, update, deletePortfolio } = require('../controller/portfolio.controller');
const authentic = require("../middleware/authentication")
const upload = require("../middleware/upload")

const routerPortfolio = express.Router();

routerPortfolio
.get("/portfolio/:id", authentic, getAll)
.get("/portfolio-detail/:id", authentic, getDetail)
.post("/portfolio/:id", authentic, upload, insert)
.put("/portfolio/:id", authentic, upload, update)
.delete("/portfolio/:id", authentic, deletePortfolio)

module.exports = routerPortfolio