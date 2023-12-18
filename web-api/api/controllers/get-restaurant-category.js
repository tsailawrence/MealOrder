const { errorResponser } = require('../libs/controller-helper');

const StoreCategory = require('../models/storeCategory');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
    } = ctx;

    const storeCategory = await StoreCategory.getStoreCategory({
    });
    
    ctx.body = storeCategory;
    
    return true;
}