'use strict';

const weixinPayService = {

    // 更新订单状态
    updateOrderStatus: async (orderId) => {
        if (!orderId) {
            console.log('订单号不能为空')
        }
        try {
            const result = await models.Order.updateOne({
                where:{
                    orderId
                }
            });
            if(result){
                console.log('更新成功');
            } else {
                throw new Error('更新失败');
            }
        } catch (error) {
            console.log(error);
        }

    },

};


module.exports = weixinPayService;
