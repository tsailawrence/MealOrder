const { updateById: updateUserById } = require('../models/user');

module.exports = async ctx => {
    const {
        currentUser,
        params: { senderId }
    } = ctx;

    await updateUserById({
        id: currentUser?.id,
        data: {
            line_binding: senderId
        }
    });

    ctx.body = {
        result: 'success'
    };
};
