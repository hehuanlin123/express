const express = require('express');

const skuRouter = express.Router();

skuRouter.get('/list',(req, res) => {
    res.json({
        list:[
            {
                id:'001',
                name:'car'
            },
            {
                id:'002',
                name:'shoes'
            },
            {
                id:'003',
                name:'cloths'
            }
        ]
    })
});

module.exports = skuRouter;