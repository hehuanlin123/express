module.exports = {
    devServer:{
        proxy:{
            '/':{
                target:'http://127.0.0.1:3000',
                ws:true, //开启websocket服务
                changeOrigin: true //开启虚拟服务请求代理服务器
            }
        }
    }
};