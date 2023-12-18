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

    const nowCity = ctx.cookies.get('nowCity');

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

    let theStoreWithArea = theStoreWithMenu

    if(nowCity){
        theStoreWithArea = theStoreWithMenu.filter(store => store.area === nowCity);
    }

    ctx.body = theStoreWithArea;

    return true;
}