const { updateById: updateUserById } = require('../models/user');

module.exports = async ctx => {
    const {
        currentUser,
        params: { lineId }
    } = ctx;

    await updateUserById({
        id: currentUser?.id,
        data: {
            senderId: lineId
        }
    });

    ctx.body = {
        result: 'success'
    };
};
