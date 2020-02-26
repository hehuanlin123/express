'use strict';

const login_valid_middleware = function (req,res,next) {
    let { name,password } = req.query;
    if(!name || !name.length || !password || !password.length){
        res.json({
            message:'参数校验失败'
        })
    }else{
        // 传递formdata到下一步
        req.formdata = {
            name,
            password
        };
        // 如何使用formdata
        // let { formdata } = req;
        next();
    }
};

module.exports = login_valid_middleware;