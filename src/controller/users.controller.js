const usersModels= require('../model/users.model')
const { Sequelize} = require("sequelize");
const bcrypt = require('bcrypt');
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
        // eslint-disable-next-line radix
        const limit = query.limit === undefined ? 50 : parseInt(query.limit);
        const page = query.page === undefined ? 1 : query.page;
        // eslint-disable-next-line eqeqeq
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
        res.json(result);
    },
    getDetail: async (req, res) => {
        const id = req.params.id;
        const result = await usersModels.findAll({
            where: {
                id,
            }
        });
        res.json(result);
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
            res.json('username salah');
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
                    success(res, output, 'succes');
                  } else {
                    res.json("password salah")
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
                name: req.body.name,
                email: req.body.email,
                password: hash,
                no_telp: req.body.no_telp,
                image: "images.jpg"
            })
            res.json(result)
        } else {
            res.json("email sudah ada")
        }
 
    },
   update: async (req, res) => {
        const { 
            // name,
            email, 
            // no_telp,
            password,
            // image,
            // special_skill,
            // descriptions,
            // workplace,
            // sector,
            // city,
            // ig,
            // github,
            // gitlab,
            // linkedin

        } = req.body;
        // const { filename } = req.file;
        const id = req.params.id;
        const hash = bcrypt.hashSync(password, 10);
        const Detail = await usersModels.findAll({
            where: {
                id,
            }
        });
        // if (Detail.length <= 0) {
        //     res.json("users tidak ada")
        // } else {
            const result = await usersModels.update(
                { 
                    // name,
                    email,
                    password: hash,
                    // no_telp,
                    // image,
                    // special_skill,
                    // descriptions,
                    // workplace,
                    // sector,
                    // city,
                    // ig,
                    // github,
                    // gitlab,
                    // linkedin,
                }, 
                {
                    where: {
                        id,
                    },
                });
                console.log(Detail)
                res.json(result)
        // }
        
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
