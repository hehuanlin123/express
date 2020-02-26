'use strict';

const not_found_middleware = function (req,res,next) {
    res.json({
        message:'api不存在'
    })
};

module.exports = not_found_middleware;