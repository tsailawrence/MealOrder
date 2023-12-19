const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const Menu = require('../models/menu');
const MenuType = require('../models/menuType');

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

    const theMenuTypes = await MenuType.getMenuTypeByStoreId({
        storeId,
    });

    const theStoreWithMenu = {
        ...theStore,
        'menu': theMenu,
        'menuTypes': theMenuTypes.map(({
            id,
            type
        }) => ({ id, type })),
    };

    ctx.body = theStoreWithMenu;

    return true;
}