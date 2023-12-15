const { errorResponser } = require('../libs/controller-helper');
const User = require('../models/user');
const Order = require('../models/order');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            orderId
        } = {},
        request: {
            body: {
                status,
            } = {}
        } = {}
    } = ctx;

    const data = {
        status,
    }

    if (
        type !== User.TYPE.MERCHANT
    ) {
        return errorResponser(
            ctx,
            401,
            'Not a valid merchant'
        );
    }

    const theStore = await Order.updateOrderByOrderId({
        orderId,
        data,
    });

    ctx.body = {
        result: 'success'
    }
    
    
    return true;
}
