const portfolioModel = require("../models/portfolio.model");
const { Sequelize } = require("sequelize");
const fs = require("fs");
const { success, failed } = require("../helpers/response");
const Op = Sequelize.Op;

const users = {
  getAll: async (req, res) => {
    try {
      const users_id = req.params.id;
      const result = await portfolioModel.findAll({
        where: {
          users_id: parseInt(users_id),
        }
      });
      success(res, result, "Get All portfolio");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await portfolioModel.findAll({
        where: {
          id,
        },
      });
      success(res, result, "Get portfolio Success");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  insert: async (req, res) => {
    try {
      const { body } = req;
      const user_id = req.params.id;
      const { filename } = req.file;
      const result = await portfolioModel.create({
        name_apps: body.name_apps,
        link_repo: body.link_repo,
        type: body.type,
        image: filename,
        users_id: parseInt(user_id),
      });

      success(res, result, "Add Portfolio Success");
    } catch (error) {
      
      failed(res, 500, error);
    }
  },
  update: async (req, res) => {
    try {
      const { name_apps, link_repo, type, users_id } = req.body;
      const id = req.params.id;
      const { filename } = req.file;
      const Detail = await portfolioModel.findAll({
        where: {
          id,
        },
      });

      if (Detail[0].image !== "default.png") {
        fs.unlink(`./image/uploads/${Detail[0].image}`, (err) => {
          if (err) {
            failed(res.status(500), 500, err);
          }
        });
      }

      const result = await portfolioModel.update(
        {
          name_apps,
          link_repo,
          type,
          image: filename,
          users_id: parseInt(users_id),
        },
        {
          where: {
            id,
          },
        }
      );

      success(res, result, "Updata Data Success");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  deletePortfolio : async (req, res) => {
    try {
      const id = req.params.id;
      const result = await portfolioModel.findAll({
        where: {
          users_id: parseInt(id),
        },
      });
      const nameImage = await result.map(e => {return e.image})
      
      nameImage.map((e) => {
        fs.unlink(`./image/uploads/${e}`, (err) => {
            if (err) {
              failed(res.status(500), 500, err);
            }
      })
      })      

      const output = await portfolioModel.destroy({
        where: {
          users_id: id,
        },
      });
      
      success(res, output, "Delete data Success")

    } catch (error) {
      failed(res, 500, error);
    }
  },
};

module.exports = users;
