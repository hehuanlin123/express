'use strict';

const express = require('express');

const personInfoRouter = express.Router();

//注册ORM
const models = require('../../models');
// const sequelize = models.sequelize;
// const Sequelize = models.Sequelize;

//日期处理插件
const moment = require('moment');

//CRUD
personInfoRouter.get('/create',async (req,res) => {
    let { firstName,lastName,email } = req.query;
    // promise user --> sequelize对象
    let user = await models.User.create({
        firstName,
        lastName,
        email
    });
    console.log(user);
    res.json({
        message:'创建成功',
        user
    });
});

personInfoRouter.get('/list',async (req,res) => {
    let list = await models.User.findAll();
    const result = list.map(item => {
        if(item.createdAt || item.updatedAt){
            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
            item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        }
        return item;
    });
    res.json({
        result
    });
});

personInfoRouter.get('/list/:id',async (req,res) => {
    let { id } = req.params;
    let user = await models.User.findOne({
        where:{
            id
        }
    });
    user.createdAt = user.createdAt ? moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss') : undefined;
    user.updatedAt = user.updatedAt ? moment(user.updatedAt).format('YYYY-MM-DD HH:mm:ss') : undefined;
    res.json({
        user
    });
});

module.exports = personInfoRouter;
