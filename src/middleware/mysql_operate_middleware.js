'use strict';

const mysql_operate_middleware = function (req,res,next) {
    try {
        //mysql操作
    }catch (e) {
        next(e);
    }

    // Promise.then().catch(next)
};

module.exports = mysql_operate_middleware;