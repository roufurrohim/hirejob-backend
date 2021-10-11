const portfolioModel = require('../model/portfolio.model')
const { Sequelize} = require("sequelize");
const { success, failed } = require('../helpers/response');
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
        
        const users_id = req.params.id;
        const result = await portfolioModel.findAll({
            
             where: {
                users_id: parseInt(users_id),
            },
            offset,
            limit,
            field,
            typeSort,
        });
        success(res, result, 'Get All portfolio');
    },
    getDetail: async (req, res) => {
        const id = req.params.id
        const result = await portfolioModel.findAll({
            where: {
                id,
            }
        });
        success(res, result, 'Get portfolio Success');
    },
    insert: async (req, res) => {
        const { body } = req;
        const user_id = req.params.id
        const { filename } = req.file
            const result = await portfolioModel.create({
                name_apps: body.name_apps,
                link_repo: body.link_repo,
                type: body.type,
                image: filename,
                users_id: parseInt(user_id),
            })
            success(res, result, 'Get portfolio Success');
            console.log(body)
 
    },
   update: async (req, res) => {
        const { 
                name_apps,
                link_repo,
                type,
                image,
                users_id,

        } = req.body;
        const id = req.params.id;
        const Detail = await portfolioModel.findAll({
            where: {
                id,
            }
        });
            const result = await portfolioModel.update(
                { 
                    name_apps,
                link_repo,
                type,
                image,
                users_id,
                }, 
                {
                    where: {
                        id,
                    },
                });
                console.log(Detail)
                res.json(result)
   },
   delete: async (req, res) => {
        const id = req.params.id;
        const result = await portfolioModel.destroy({
            where: {
                id,
            }
        })
        res.json(result)
   }
}

module.exports = users;