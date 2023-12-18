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

    const nowCity = ctx.cookies.get('nowCity');

    const topFavoriteStores = await Store.getTopFavoriteStore({
    });


    const theFavoriteStoresIdObjArray = await FavoriteStore.getUserFavoriteStoreId({
        userId,
    });

    const theFavoriteStoresIds = theFavoriteStoresIdObjArray.map(item => item.storeID);

    // 在 topFavoriteStores 中新增 liked 欄位
    const topFavoriteStoresWithLiked = topFavoriteStores.map(store => ({
        ...store,
        liked: theFavoriteStoresIds.includes(store.id),
    }));

    let topFavoriteStoresWithLikedWithArea = topFavoriteStoresWithLiked

    if(nowCity){
        topFavoriteStoresWithLikedWithArea = topFavoriteStoresWithLiked.filter(store => store.area === nowCity);
    }
    
    ctx.body = topFavoriteStoresWithLikedWithArea;
    
    return true;
}