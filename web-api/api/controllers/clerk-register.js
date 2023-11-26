const { errorResponser } = require('../libs/controller-helper');
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const moment = require('moment');

module.exports = async ctx => {
    const {
        request: {
            body: {
                firstName,
                lastName,
                emailAddress,
                phoneNumber,
                imageUrl,
                authenticationMethod,
                type,
            } = {},
        } = {},
        currentUser: {
            userId
        },
    } = ctx;

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

    ctx.body = {
        result: 'success'
    }
    
    return true;
}