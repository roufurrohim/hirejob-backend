const usersModels = require("../models/users.model");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { success, failed } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");
const Skill = require("../models/skillmodel");
const Exp = require("../models/expmodel");
const Op = Sequelize.Op;
const sendEmail = require("../helpers/mail")

const users = {
  getAll: async (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? "" : query.search;
      const field = query.field === undefined ? "id" : query.field;
      const typeSort = query.sort === undefined ? "" : query.sort;
      const limit = query.limit === undefined ? 5 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      
      Skill.belongsTo(usersModels, {foreignKey: "users_id"})
      
      Exp.belongsTo(usersModels, {foreignKey: "users_id"})

      usersModels.hasMany(Skill, {foreignKey: "users_id"})

      usersModels.hasMany(Exp, {foreignKey: "users_id"})

      const result = await usersModels.findAll({
        include: [Skill, Exp],
        where: {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
            offset,
            limit,
            field,
            typeSort,
          })
          const output = {
            data: result,
            limit,
            page,
          }
      success(res, output, "Get All Users Success");

    } catch (error) {
      failed(res, 404, error);
    }
  },
  myDetail: async (req, res) => {
      try{
          const id = req.userId;
          const result = await usersModels.findAll({
              where: {
                  id,
              }
          });
          success(res, result, 'Get Details Users Success');
      } catch (error) {
          failed(res, 404, error);
      }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      Skill.belongsTo(usersModels, {foreignKey: "users_id"})
      
      Exp.belongsTo(usersModels, {foreignKey: "users_id"})

      usersModels.hasMany(Skill, {foreignKey: "users_id"})

      usersModels.hasMany(Exp, {foreignKey: "users_id"})

      const result = await usersModels.findAll({
        where: {
          id,
        },
        include: [Skill, Exp]
      });
      success(res, result, "Get Details Users Success");
    } catch (error) {
      failed(res, 404, error);
    }
  },
  login: async (req, res) => {
    try {
      const { body } = req;
      const email = req.body.email;
      const cekEmail = await usersModels.findAll({
        where: {
          email,
        },
      });
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
            success(res, output, "Login Success");
          } else {
            failed(res.status(404), 404, "Wrong Password");
          }
        });
      }
    } catch (error) {
      failed(res, 500, error);
    }
  },
  register: async (req, res) => {
    try {
      const { body } = req;
      const hash = bcrypt.hashSync(body.password, 10);
      const email = req.body.email;
      const cekEmail = await usersModels.findAll({
        where: {
          email,
        },
      });
      if (cekEmail.length <= 0) {
        const result = await usersModels.create({
          name: body.name,
          email: body.email,
          password: hash,
          no_telp: body.no_telp,
          status: body.status,
          image: "default.png",
        });
        success(res, result, "Register Success");
      } else {
        failed(res.status(401), 401, "Email already exist");
      }
    } catch (error) {
      failed(res, 500, error);
    }
  },
  update: async (req, res) => {
    try {
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
      // console.log(name)
      const id = req.params.id;
      const hash = bcrypt.hashSync(password, 10);
      const Detail = await usersModels.findAll({
        where: {
          id,
        },
      });
      const result = await usersModels.update(
        {
          name,
          email,
          password: hash,
          no_telp,
          image: req.file ? req.file.filename : "default.png",
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
      if (Detail[0].image === "default.png") {
        success(res, result, "Update Data Success");
      } else {
        fs.unlink(`./image/uploads/${Detail[0].image}`, (err) => {
          if (err) {
            failed(res.status(500), 500, err);
          } else {
            success(res, result, "Update Data Success");
          }
        });
      }
    } catch (error) {
      failed(res, 500, error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await usersModels.destroy({
        where: {
          id,
        },
      });
      const output = {
        deleteId: result,
      };
      success(res, output, "Delete Data User Success");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  forgetPassword: async(req, res) =>{
    try {
      const { body } = req;
      const email = req.body.email;
      const cekEmail = await usersModels.findAll({
        where: {
          email,
        },
      });
      if (cekEmail.length <= 0) {
        failed(res.status(404), 404, "Email not Exist");
      } else {
        const user = cekEmail[0];
        const payload = {
          id: user.id,
        };
        const output = {
          user,
          token: jwt.sign(payload, JWT_SECRET),
        };
        sendEmail(user, output)
        .then((result)=>{
          success(res, 200, result)
        }).catch((error)=>{
          failed(res.status(401), 401, error)
        })
      }
    } catch (error) {
      failed(res.status(500), 500, error);
    }
  },
};

module.exports = users;
