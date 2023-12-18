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
                userId,
                firstName,
                lastName,
                emailAddress,
                phoneNumber,
                imageUrl,
                authenticationMethod,
                type,
            } = {},
        } = {}
    } = ctx;


    const [theUser] = await User.getUserByUserId({
        userId,
    });

    if (theUser) {
        return errorResponser(
            ctx,
            400,
            'The user has been register.'
        )
    }

    const refreshToken = md5(`refresh_${userId}_${moment().unix()}`);

    await User.insert({
        userId,
        name: `${firstName} ${lastName}`,
        token: refreshToken,
        emailAddress,
        phoneNumber,
        imageUrl,
        authenticationMethod,
        type,
    });

    const accessToken = jwt.sign(
        {
            userId,
            refreshToken,
        },
        config.api.privateKey,
        { expiresIn: 10 * 60 }
    );

    ctx.body = {
        refreshToken,
        accessToken,
    }
    
    return true;
}