'use strict';

const express = require('express');

const weixinPayRouter = express.Router();

const xmlparser = require('express-xml-bodyparser');//引入xml解析器

const weixinPayService = require('../service/weixinPayService.js');

weixinPayRouter.all('/result_notify', xmlparser({ trim: false, explicitArray: false }), function (req, res, next) {
    var jsonData = req.body.xml;
    if (jsonData.result_code == 'SUCCESS') {
        var key = "c24cb4054b87951ee24dc736c67b94ca"; // 本地签名key
        var stringA = "appid=" + jsonData.appid + "&bank_type=" + jsonData.bank_type + "&cash_fee=" + jsonData.cash_fee + "&fee_type=" + jsonData.fee_type +
            "&is_subscribe=" + jsonData.is_subscribe + "&mch_id=" + jsonData.mch_id + "&nonce_str=" + jsonData.nonce_str + "&openid=" +
            jsonData.openid + "&out_trade_no=" + jsonData.out_trade_no + "&result_code=" + jsonData.result_code + "&return_code=" +
            jsonData.return_code + "&time_end=" + jsonData.time_end + "&total_fee=" + jsonData.total_fee + "&trade_type=" +
            jsonData.trade_type + "&transaction_id=" + jsonData.transaction_id;
        var stringSignTemp = stringA + "&key=" + key;
        var sign = md5(stringSignTemp).toUpperCase(); // 本地生成签名
        console.log(sign)

        if (sign == jsonData.sign) { //签名校验，本地生成的签名、回调返回的签名
            console.log('yes')
            // 调用本地方法，更新订单状态
            weixinPayService.updateOrderStatus(jsonData.out_trade_no).then(function (data) {
                // console.log(data)
                console.log('success')
            })
            //json转xml
            var json2Xml = function (json) {
                let _xml = '';
                Object.keys(json).map((key) => {
                    _xml += `<${key}>${json[key]}</${key}>`
                })
                return `<xml>${_xml}</xml>`;
            }
            var sendData = {
                return_code: 'SUCCESS',
                return_msg: 'OK'
            }
            //给微信支付返回结果
            res.end(json2Xml(sendData));
        }
    }
});

module.exports = weixinPayRouter;