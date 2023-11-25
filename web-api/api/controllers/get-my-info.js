const User = require('../models/user');

module.exports = async ctx => {
    const {
        currentUser
    } = ctx;

    ctx.body = currentUser;

    return true;
}