const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const Order = require('../models/order');
const User = require('../models/user');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            storeId,
            month
        } = {},
    } = ctx;

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

    if (
        !theStore
        || type !== User.TYPE.MERCHANT
    ) {
        return errorResponser(
            ctx,
            401,
            'Not a valid merchant'
        );
    }

    const theOrders = await Order.getOrdersDetailByStoreId({
        storeId: theStore?.id,
    });

    const theOrdersByMonth  = theOrders.filter(order => {
        // 获取订单的年月部分，格式为 "YYYYMM"
        const orderMonth = order.time.slice(0, 7).replace('-', '');
      
        // 判断是否与目标月份匹配
        return orderMonth === month;
      });

    ctx.body = theOrdersByMonth;
    
    return true;
}