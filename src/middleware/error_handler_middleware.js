'use strict';

const error_handler_middleware = function (err,req,res,next) {
    if(err){
        res.status(500).json({
            message:'服务器异常'
        })
    } else {
        //
    }
};

module.exports = error_handler_middleware;