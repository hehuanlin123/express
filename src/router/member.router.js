const express = require('express');

const memberRouter = express.Router();

//(2)路由级别使用中间件
// 第一个使用场景
// const valid_name_middleware = require('../middleware/valid_name_middleware.js');
// memberRouter.use(valid_name_middleware);


// 第二个使用场景
memberRouter.get('/list',[/** middleware **/],(req, res) => {
    // throw new Error('测试异常功能')
    res.json({
        list:[
            {
                id:'001',
                name:'tom'
            },
            {
                id:'002',
                name:'jack'
            },
            {
                id:'003',
                name:'mike'
            }
        ]
    })
});

module.exports = memberRouter;