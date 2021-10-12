// untuk menghandle router table user

const express = require('express');
const skillctrl = require('../controller/skillctrl');
// const midAuth = require('../middleware/authentication');

const skillrouter = express.Router();
skillrouter
  .get('/skill', skillctrl.getlist)
  .get('/skill/:id', skillctrl.getdetail)
  .post('/skill', skillctrl.insert)
  .delete('/skill/:id', skillctrl.del)
  .put('/skill/:id', skillctrl.update);

module.exports = skillrouter;
