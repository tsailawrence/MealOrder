const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const Order = require('../models/order');

module.exports = async ctx => {
    const {
        params: {
            categoryId
        } = {},
    } = ctx;

    const nowCity = ctx.cookies.get('nowCity');

    const theStore = await Store.getStoreByCategory({
        categoryId,
    });

    let theStoreWithArea = theStore

    if(nowCity){
        theStoreWithArea = theStore.filter(store => store.area === nowCity);
    }

    ctx.body = theStoreWithArea;
    
    return true;
}