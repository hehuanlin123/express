'use strict';

const express = require('express');

const models = require('../../models');

// const moment = require('moment');

const todoRouter = express.Router();

todoRouter.get('/list/:status/:page',async (req,res,next) => {
    try {
        let { status, page } = req.params;
        let limit = 10;
        let offset = (page - 1) * limit;
        let where = {};
        // 1--新增，2--待办，3--已完成，-1--删除，""--全部
        if(status != -1){
            where.status = status;
        }
        let list = models.Todo.findAndCountAll({
            where,
            limit,
            offset
        });
        res.json({
            list,
            message:'查询列表成功'
        });
    } catch(e) {
        next(e)
    }
});

todoRouter.post('/add',async (req,res,next) => {
    try {
        let { name, deadline, content, status, flag } = req.body;
        let todo = await models.Todo.create({
            name,
            deadline,
            content,
            status,
            flag
        });
        res.json({
            todo,
            message:'创建成功'
        });
    } catch(e) {
        next(e)
    }
});

todoRouter.post('/edit',async (req,res,next) => {
    try {
        let { id, name, deadline, content, status, flag } = req.body;
        let todo = await models.Todo.findOne({
            where:{
                id
            }
        });
        if(todo){
            todo = await todo.update({
                name,
                deadline,
                content,
                status,
                flag
            })
        }
        res.json({
            todo,
            message:'修改成功'
        });
    } catch(e) {
        next(e)
    }
});

todoRouter.post('/delete',async (req,res,next) => {
    try {
        let { id, flag } = req.params;
        let todo = await models.Todo.findOne({
            where: {
                id
            }
        });
        if(todo) {
            todo = await todo.update({
                flag
            })
        }
        res.json({
            todo,
            message:'删除成功'
        });
    } catch(e) {
        next(e)
    }
});

todoRouter.post('/changeState',async (req,res,next) => {
    try {
        let { id, flag } = req.params;
        let todo = await models.Todo.findOne({
            where: {
                id
            }
        });
        if(todo) {
            todo = await todo.update({
                flag
            })
        }
        res.json({
            todo,
            message:'修改状态成功'
        });
    } catch(e) {
        next(e)
    }
});

module.exports = todoRouter;