const { errorResponser } = require('../libs/controller-helper');

const Order = require('../models/order');
const Store = require('../models/store');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            orderId
        } = {},
    } = ctx;

    const theOrder = await Order.deleteOrderByOrderId({
        orderId,
    });

    ctx.body = {
        result: 'success'
    }
    
    
    return true;
}