const { errorResponser } = require('../libs/controller-helper');
const User = require('../models/user');
const Store = require('../models/store');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        request: {
            body: {
                name,
                category,
                area,
            } = {}
        } = {}
    } = ctx;

    const data = {
        userId,
        name,
        category,
        area,
    }

    if (
        type !== User.TYPE.MERCHANT
    ) {
        return errorResponser(
            ctx,
            401,
            'Not a valid merchant'
        );
    }

    const [theStore] = await Store.addStoreByUserId({
        data,
    });

    ctx.body = {
        result: 'success'
    }
    
    
    return true;
}