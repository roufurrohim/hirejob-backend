/* eslint-disable no-shadow */
/* eslint-disable max-len */
const Skill = require('../models/skillmodel');
const { success, failed } = require('../helpers/response');
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

// table skill di dalam database coffee_shop di mysql
const skillctrl = {
// menampilkan list skill
  getlist: async (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const result = await Skill.findAll({
        where: {
          name_skill: {
            [Op.substring]: search
          }
        }
      });
      const output = {
        data: result,
        search
      };
      success(res, output, 'get skill data success');
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // menampilkan detail table skill berdasarkan id
  getdetail: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Skill.findAll({
        where: {
          users_id: id
        }
      });
      success(res, result, 'get skill details success');
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // insert data skill
  insert: async (req, res) => {
    try {
      const { body } = req;
      const result = await Skill.create({
        name_skill: body.name_skill,
        users_id: body.users_id
      });
      success(res, result, 'Input skill Data Success');
    } catch (err) {
      failed(res, 401, err);
    }
  },

  // delete data skill
  del: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Skill.destroy({
        where: {
          id: id
        }
      })
      success(res, result, 'Delete skill Data Success');
    } catch (err) {
      failed(res, 404, err);
    }
  },
  update: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const result = await Skill.update(
        {
          name_skill: body.name_skill
        },
        {
          where: {
            id: id
          }
        }
      )
      success(res, result, 'Update skill Data Success');
    } catch (err) {
      failed(res, 500, err);
    }
  },
};

module.exports = skillctrl;
