const Store = require('../models/store');

exports.getStoreByStoreId = async ctx => {
    const {
        request: {
            body: {
                storeId,
            } = {},
        } = {}
    } = ctx;

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

    ctx.body = {
        theStore,
    }
    
    return true;
}

exports.getStoreBySearch = async ctx => {
    const {
        request: {
            body: {
                SearchString,
            } = {},
        } = {}
    } = ctx;

    const [StoreList] = await Store.getStoreBySearch({
        SearchString,
    });

    ctx.body = {
        StoreList,
    }
    
    return true;
}

exports.getTopFavoriteStore = async ctx => {
    const {
        request: {
            body: {
                SearchString,
            } = {},
        } = {}
    } = ctx;

    const [StoreList] = await Store.getTopFavoriteStore();

    ctx.body = {
        StoreList,
    }
    
    return true;
}

exports.getUserFavoriteStore = async ctx => {
    const {
        request: {
            body: {
                SearchString,
            } = {},
        } = {}
    } = ctx;

    const [StoreList] = await Store.getUserFavoriteStore();

    ctx.body = {
        StoreList,
    }
    
    return true;
}