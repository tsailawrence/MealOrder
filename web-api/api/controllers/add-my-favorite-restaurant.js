const { errorResponser } = require('../libs/controller-helper');

const FavoriteStore = require('../models/favoriteStore');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            storeId
        } = {},
    } = ctx;

    const theFavoriteStoresIdObjArray = await FavoriteStore.addUserFavoriteStoreId({
        userId,
        storeId,
    });
    ctx.body = {
        result: 'success'
    };
    return true;
}