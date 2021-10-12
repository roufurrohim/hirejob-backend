/* eslint-disable no-shadow */
/* eslint-disable max-len */
const Exp = require('../models/expmodel');
const { success, failed } = require('../helpers/response');
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

// table exp di dalam database coffee_shop di mysql
const expctrl = {
// menampilkan list exp
  getlist: async (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const result = await Exp.findAll({
        where: {
          company: {
            [Op.substring]: search
          }
        }
      });
      const output = {
        data: result,
        search
      };
      success(res, output, 'get experience data success');
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // menampilkan detail table exp berdasarkan id
  getdetail: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Exp.findAll({
        where: {
          users_id: id
        }
      });
      success(res, result, 'get experience details success');
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // insert data exp
  insert: async (req, res) => {
    try {
      const { body } = req;
      const result = await Exp.create({
        company: body.company,
        position: body.position,
        start_work: body.start_work,
        end_work: body.end_work,
        description: body.description,
        users_id: body.users_id,
      });
      success(res, result, 'Input experience Data Success');
    } catch (err) {
      failed(res, 401, err);
    }
  },

  // delete data exp
  del: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Exp.destroy({
        where: {
          id: id
        }
      })
      success(res, result, 'Delete experience Data Success');
    } catch (err) {
      failed(res, 404, err);
    }
  },
  update: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const result = await Exp.update(
        {
          company: body.company
        },
        {
          position: body.position
        },
        {
          start_work: body.start_work
        },
        {
          end_work: body.end_work
        },
        {
          description: body.description
        },
        {
          where: {
            id: id
          }
        }
      )
      success(res, result, 'Update experience Data Success');
    } catch (err) {
      failed(res, 500, err);
    }
  },
};

module.exports = expctrl;
