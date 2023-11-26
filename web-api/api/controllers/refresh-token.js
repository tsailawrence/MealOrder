const { errorResponser } = require('../libs/controller-helper');
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const moment = require('moment');
const config = require('config');

module.exports = async ctx => {
    const {
        request: {
            body: {
                refreshToken,
            } = {},
        } = {}
    } = ctx;

    
    const [theUser] = await User.getUserByToken({
        token: refreshToken,
    });

    if (!theUser) {
        return errorResponser(
            ctx,
            401,
            'Refresh token error'
        )
    }

    const newrefreshToken = md5(`refresh_${theUser?.userId}_${moment().unix()}`);

    await User.updateByUserId({
        userId: theUser?.userId,
        data: {
            token: newrefreshToken,
        }
    });

    const accessToken = jwt.sign(
        {
            userId: theUser?.userId,
            refreshToken: newrefreshToken,
        },
        config.api.privateKey,
        { expiresIn: 10 * 60 }
    );

    ctx.body = {
        refreshToken: newrefreshToken,
        accessToken,
    }
    
    return true;
}