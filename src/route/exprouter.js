// untuk menghandle router table user

const express = require('express');
const expctrl = require('../controller/expctrl');
const midAuth = require('../middleware/authentication');

const exprouter = express.Router();
exprouter
  .get('/exp', expctrl.getlist)
  .get('/exp/:id', expctrl.getdetail)
  .post('/exp', expctrl.insert)
  .delete('/exp/:id', expctrl.del)
  .put('/exp/:id', expctrl.update);

module.exports = exprouter;
