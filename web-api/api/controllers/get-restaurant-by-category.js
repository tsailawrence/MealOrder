const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const Order = require('../models/order');

module.exports = async ctx => {
    const {
        params: {
            categoryId
        } = {},
    } = ctx;

    const theStore = await Store.getStoreByCategory({
        categoryId,
    });

    ctx.body = theStore;
    
    return true;
}