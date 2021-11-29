const express = require('express');
const authen = require('../middleware/authentication');
const upload = require('../middleware/upload');


const { 
    getAll, 
    register,
    update,
    updateWorker,
    deleteUser, 
    getDetail,
    myDetail,
    login,
    forgetPassword
} = require('../controller/users.controller');

const usersRouter = express.Router();

usersRouter
.get('/users', authen, getAll)
.get('/user/:id',authen, getDetail)
.get('/mydetail',authen, myDetail)
.post('/register', register)
.post('/login', login)
.put('/user/:id',authen, upload, update)
.put('/user-worker/:id',authen, upload, updateWorker)
.delete('/user/:id', authen, deleteUser)
.post('/forget-pass', forgetPassword)

module.exports = usersRouter;