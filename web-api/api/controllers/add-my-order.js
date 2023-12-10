const { errorResponser } = require('../libs/controller-helper');

const User = require('../models/user');
const Order = require('../models/order');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        request: {
            body: {
                storeId,
                payment,
                pickupTime,
                items,
            } = {}
        } = {}
    } = ctx;

    await Order.insert({
        customerId: userId,
        storeId: storeId,
        status: 'Comfirmed',
        payment: payment,
        pickupTime: pickupTime,
    },items);
    
    ctx.body = {
        result: 'success'
    };
    
    return true;
}