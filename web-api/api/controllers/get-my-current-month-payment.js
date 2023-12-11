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

    const theUserOrders = await Order.getCurrentMonthOrderByCustomerId({
        userId,
    });
    const theStoreSet = new Map();;

    await Promise.all(theUserOrders.map(async (order)=>{
            const storeId = order.storeId

            if(!theStoreSet.has(storeId)){
                const [theStore] = await Store.getStoreByStoreId({
                    storeId,
                });
                theStoreSet.set(storeId, theStore)
            }
    
        }))

    const theStoreArray = Array.from(theStoreSet.values());

    const theStoreSetWithPayment = await Promise.all(theStoreArray.map(async (store)=>{

        let storeTotalPayment = 0;
        let orderCount = 0;
        let storeOrderDetail = [];

        await Promise.all(theUserOrders.map(async (order)=>{
            const storeId = order.storeId
            if(storeId == store.id){
                storeTotalPayment += order.payment;
                orderCount += 1;
                storeOrderDetail.push(order)
            };
        }))

        return {
            ...store,
            storeTotalPayment:storeTotalPayment,
            orderCount:orderCount,
            storeOrderDetail:storeOrderDetail
        }
        
    }));

    ctx.body = theStoreSetWithPayment;
    
    return true;
}