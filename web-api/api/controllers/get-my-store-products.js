const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const MenuType = require('../models/menuType');
const Menu = require('../models/menu');
const User = require('../models/user');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            storeId
        } = {},
        request: {
            body: {
                name,
                description,
                price,
                menuTypeId,
                amount,
            } = {}
        } = {}
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

    const theMenus = await Menu.getMenuByStoreId({
        storeId,
    });

    const theMenuTypes = await MenuType.getMenuTypeByStoreId({
        storeId,
    });

    ctx.body = {
        menus: theMenus,
        menuTypes: theMenuTypes.map(({
            id,
            type
        }) => ({ id, type })),
    }
}