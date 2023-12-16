const { errorResponser } = require('../libs/controller-helper');

const Menu = require('../models/menu');
const Store = require('../models/store');
const User = require('../models/user');
module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            storeId,
            menuId
        } = {},
    } = ctx;

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

    if (
        !theStore
        || type !== User.TYPE.MERCHANT
        || theStore.userId !== userId
    ) {
        return errorResponser(
            ctx,
            401,
            'Operation error.'
        );
    }

    const theMenu = await Menu.delete({
        menuId,
    });

    ctx.body = {
        result: 'success'
    }
    
    
    return true;
}