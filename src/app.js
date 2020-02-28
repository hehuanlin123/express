'use strict';

const express = require('express');

const app = express();

//全局异常
const error_handler_middleware = require('./middleware/error_handler_middleware.js');
app.use(error_handler_middleware);

//POST请求解析器,express默认不带body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//注册路由
const memberRouter = require('./router/member.router.js');
const skuRouter = require('./router/sku.router.js');
const personInfoRouter = require('./router/personInfo.router.js');
const weixinPayRouter = require('./router/weixinPay.router.js');
const todoRouter = require('./router/todo.router.js');
app.use('/member',memberRouter);
app.use('/sku',skuRouter);
app.use('/personInfo',personInfoRouter);
app.use('/weixinPay',weixinPayRouter);
app.use('/todo',todoRouter);

//(2) router级别使用中间件只能单独一个router
// app.use(memberRouter);

//注册中间件
// const valid_name_middleware = require(./middleware/valid_name_middleware.js');
// const error_handler_middleware = require('./middleware/error_handler_middleware.js');
// 1.使用中间件
// const not_found_middleware = require('./middleware/not_found_middleware.js');
// app.all('*',valid_name_middleware);
// app.use(error_handler_middleware);
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

app.listen(3000,() => {
    console.log('server启动成功!')
});
