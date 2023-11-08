const { getByUserId } = require('../models/favorite-city');

module.exports = async ctx => {
    const { userId } = ctx.request.query;

    const data = await getByUserId({
        userId
    });

    ctx.body = {
        name: data?.[0]?.city ?? null
    }    
}