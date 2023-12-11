const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const FavoriteStore = require('../models/favoriteStore');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
    } = ctx;

    const theFavoriteStoresIdObjArray = await FavoriteStore.getUserFavoriteStoreId({
        userId,
    });


    const theFavoriteStoresIds = theFavoriteStoresIdObjArray.map(item => item.storeID);


    const theFavoriteStoresWithInfo = await Store.getStoreByStoreIdArray({
        theFavoriteStoresIds, 
    });

    ctx.body = theFavoriteStoresWithInfo;
    
    return true;
}