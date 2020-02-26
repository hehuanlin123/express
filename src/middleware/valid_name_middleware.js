'use strict';

const valid_name_middleware = function (req,res,next) {
    let { name } = req.query;
    if(!name || !name.length){
        res.json({
            message:'缺少name参数'
        })
    }else{
        next();
    }
};

module.exports = valid_name_middleware;