const { errorResponser } = require('../libs/controller-helper');

const Order = require('../models/order');
const Store = require('../models/store');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
    } = ctx;

    const theUserOrders = await Order.getOrderByCustomerId({
        userId,
    });

    const theUserOrdersWithStore = await Promise.all(theUserOrders.map(async (order)=>{
        const storeId = order.storeId
        const [theStore] = await Store.getStoreByStoreId({
            storeId,
        });

        return {
            ...order,
            storeInfo: theStore
        }


    }))


    ctx.body = theUserOrdersWithStore;
    
    return true;
}