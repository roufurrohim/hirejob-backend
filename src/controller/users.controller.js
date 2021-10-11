const usersModels= require('../models/users.model')
const { Sequelize} = require("sequelize");
const bcrypt = require('bcrypt');
const fs = require("fs");
const { success, failed } = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../helpers/env');
const Op = Sequelize.Op;

const users = {
    getAll: async (req, res) => {
        const { query } = req;
        const search = query.search === undefined ? '' : query.search;
        const field = query.field === undefined ? 'id' : query.field;
        const typeSort = query.sort === undefined ? '' : query.sort;
        const limit = query.limit === undefined ? 50 : parseInt(query.limit);
        const page = query.page === undefined ? 1 : query.page;
        const offset = page === 1 ? 0 : (page - 1) * limit;

        const result = await usersModels.findAll({
             where: {
                name: {
                [Op.like]: `%${search}%`
                }
            },
            offset,
            limit,
            field,
            typeSort,
        });
        success(res, result, 'Get All Users Success');
    },
    getDetail: async (req, res) => {
        const id = req.params.id;
        const result = await usersModels.findAll({
            where: {
                id,
            }
        });
        success(res, result, 'Get Details Users Success');
    },
    login: async (req, res) => {
        const { body } = req;
        const email = req.body.email
        const cekEmail = await usersModels.findAll({
            where: {
                email
            }
        })
        if (cekEmail.length <= 0) {
            failed(res.status(404), 404, "Email not Exist");
        } else { 
            const passwordHash = cekEmail[0].password; 
            bcrypt.compare(body.password, passwordHash, (error, checkpassword) => {
                if (error) {
                    res.json(error);
                  } else if (checkpassword === true) {
                    const user = cekEmail[0];
                    const payload = {
                      id: user.id,
                    };
                    const output = {
                      user,
                      token: jwt.sign(payload, JWT_SECRET),
                    };
                    success(res, output, 'Login Success');
                  } else {
                    failed(res.status(404), 404, "Wrong Password")
                  } 
            })
        }

    },
    register: async (req, res) => {
        const { body } = req;
        const hash = bcrypt.hashSync(body.password, 10);
        const email = req.body.email
        const cekEmail = await usersModels.findAll({
            where: {
                email
            }
        })
        if (cekEmail.length <= 0) {
            const result = await usersModels.create({
                name: body.name,
                email: body.email,
                password: hash,
                no_telp: body.no_telp,
                status: body.status,
                image: "default.png"
            })
            success(res, result, 'Register Success');
        } else {
            failed(res.status(401), 401, "Email already exist")
        }
 
    },
   update: async (req, res) => {
        const { 
            name,
            email, 
            no_telp,
            password,
            // image,
            special_skill,
            descriptions,
            workplace,
            sector,
            city,
            ig,
            github,
            gitlab,
            linkedin,
            status,

        } = req.body;
        const { filename } = req.file;
        const id = req.params.id;
        const hash = bcrypt.hashSync(password, 10);
        const Detail = await usersModels.findAll({
            where: {
                id,
            }
        });
        
        if (Detail[0].image !== 'default.png') {
            fs.unlink(`./image/uploads/${Detail[0].image}`, (err) => {
                if (err) {
                  errLogin(res, err);
                }
              });
        } 
          
            const result = await usersModels.update(
                { 
                    name,
                    email,
                    password: hash,
                    no_telp,
                    image: filename,
                    special_skill,
                    descriptions,
                    workplace,
                    sector,
                    city,
                    ig,
                    github,
                    gitlab,
                    linkedin,
                    status,
                }, 
                {
                    where: {
                        id,
                    },
                });
                
                success(res, result, "Update Data Success")
        
   },
   deleteUser: async (req, res) => {
        const id = req.params.id;
        const result = await usersModels.destroy({
            where: {
                id,
            }
        })
        res.json(result)
   }
}

module.exports = users;
