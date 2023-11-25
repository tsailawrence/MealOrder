const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');

const { errorResponser } = require('../libs/controller-helper');

exports.auth = async (ctx, next) => {
    const { accessToken } = ctx?.request?.query ?? {};

    if (!accessToken) {
        return errorResponser(
            ctx,
            401,
        )
    }

    const { userId, refreshToken } = jwt.verify(accessToken, config.api.privateKey);

    console.info("Find user", { userId, refreshToken });

    const [theUser] = await User.getVerifiedUser({
        userId,
        token: refreshToken,
    });

    ctx.currentUser = theUser;
    
    return next();
};
