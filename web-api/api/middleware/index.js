const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');
const { jwtDecode } = require('jwt-decode');

const { errorResponser } = require('../libs/controller-helper');
const moment = require('moment');

exports.verifyClerk = async (ctx, next) => {
    const { accessToken } = ctx?.request?.query ?? {};
    
    if (!accessToken) {
        return errorResponser(
            ctx,
            401,
        )
    }

    try {
        const { 
            sub: userId, 
            exp 
        } = jwtDecode(accessToken) || {};

        if (!userId) {
            throw new Error('User not found.');
        }

        if (exp < moment().unix()) {
            throw new Error('Expired.');
        }

        const [theUser] = await User.getUserByUserId({
            userId
        });

        if (
            !theUser 
            && ctx?._matchedRouteName !== 'clerkRegister'
        ) {
            return errorResponser(
                ctx,
                401,
            )
        } else if (ctx?._matchedRouteName === 'clerkRegister') {
            if (theUser) {
                return errorResponser(
                    ctx,
                    401,
                    'The user has been registered.'
                );
            }
            ctx.currentUser = {
                userId
            };
        } else {
            ctx.currentUser = theUser;
        }
    } catch (err) {
        console.error('err', err);
        return errorResponser(
            ctx,
            401,
            err?.message
        )
    }
    
    return next();
};


exports.auth = async (ctx, next) => {
    const { accessToken } = ctx?.request?.query ?? {};

    if (!accessToken) {
        return errorResponser(
            ctx,
            401,
        )
    }

    const { userId, refreshToken } = jwt.verify(accessToken, `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4iBOln5wBB3kfoQsv/mq
    rsCA5GFQQYbVVlxA1EjDCSJWISldju13E+DSNl0smGwFZ2+DqGAlnm3Q8u/utzTI
    c7F269X5R+2PznzeLXd/g5X1kYjgxxBzh75Fc2gLwI20SFnAbkCSi4GNM8lA34I0
    FJm85rEi5iHpQpxJRC4lowMnYFLDBYZ02hAWscFYlIoHMUSlgcTSs5svLge+yu4U
    Aw9vSVo6e8w5zfVVcGc24pwmgYyZY8vBPxPh51v/3RFN12pWGPhBwPymOvJZhGlF
    /gmPO9ph+4jSf8noYV3JFeCZ8Lwi3UgxSGFmgUKa90BR5jMbqVX14tfwAQ+2fh4V
    kwIDAQAB
    -----END PUBLIC KEY-----`);

    console.info("Find user", { userId, refreshToken });

    const [theUser] = await User.getVerifiedUser({
        userId,
        token: refreshToken,
    });

    ctx.currentUser = theUser;
    
    return next();
};
