const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const Menu = require('../models/menu');

module.exports = async ctx => {
    const {
        params: {
            storeId
        } = {},
    } = ctx;

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

    const theMenu = await Menu.getMenuByStoreId({
        storeId,
    });

    const theStoreWithMenu = {
        ...theStore,
        'menu'  : theMenu
    };
 
    ctx.body = theStoreWithMenu;
    
    return true;
}