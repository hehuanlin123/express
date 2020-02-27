'use strict';

const express = require('express');

const app = express();

//注册路由
const memberRouter = require('./router/member.router.js');
const skuRouter = require('./router/sku.router.js');
app.use('/member',memberRouter);
app.use('/sku',skuRouter);

//(2) router级别使用中间件只能单独一个router
// app.use(memberRouter);

//注册中间件
// const valid_name_middleware = require(./middleware/valid_name_middleware.js');
const error_handler_middleware = require('./middleware/error_handler_middleware.js');
// 1.使用中间件
// const not_found_middleware = require('./middleware/not_found_middleware.js');
// app.all('*',valid_name_middleware);
app.use(error_handler_middleware);
// app.use(not_found_middleware);
// 2.下一步再请求特定URI
// app.get('/test',(req,res) => {
//     res.json({
//         message:'test'
//     })
// });
//测试：GET  /test?name=123

//(1)全局中间件
// app.use(valid_name_middleware);
//加载一个static的中间件
// app.use(express.static('src/static',{
//
// }))


// app.use((req,res) => {
//     res.json({
//         name:'张三'
//     });
// })

// app.get('/name/:age/:sex',(req,res) => {
//     let { age, sex } = req.params;
//     res.json({
//         name:'tom',
//         age,
//         sex,
//     })
// });

// app.post('/name',(req,res) => {
//     res.send('toms post')
// });

// app.all('/demo',(req,res) => {
//     res.json({
//         name:'tom',
//         method:req.method
//     })
// });

// app.all('*',(req,res) => {
//     res.json({
//         name:'tom',
//         method:req.method,
//         uri:req.path
//     })
// });

// app.use((req,res) => {
//     res.json({
//         name:'tom',
//         method:req.method,
//         uri:req.path
//     })
// });


//注册ORM
const models = require('../models');
// models.User
// model.Sequelize
// models.sequelize

//日期处理插件
const moment = require('moment');
app.use(moment);

//CRUD
app.get('/create',async (req,res) => {
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

app.get('/list',async (req,res) => {
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

app.get('/list/:id',async (req,res) => {
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


app.listen(3000,() => {
    console.log('server启动成功!')
});
