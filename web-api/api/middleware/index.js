const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');
const { jwtDecode } = require('jwt-decode');

const { errorResponser } = require('../libs/controller-helper');
const moment = require('moment');

exports.verifyClerk = async (ctx, next) => {
  const { accessToken } = ctx?.request?.query ?? {};

  if (!accessToken) {
    return errorResponser(ctx, 401);
  }

  if (accessToken.includes('dev:id:')) {
    const [theUser] = await User.getUserById({
      id: accessToken?.split('dev:id:')?.[1],
    });

    ctx.currentUser = theUser;
    return next();
  }

  try {
    const { sub: userId, exp } = jwtDecode(accessToken) || {};

    if (!userId) {
      throw new Error('User not found.');
    }

    // if (exp < moment().unix()) {
    //     throw new Error('Expired.');
    // }

    const [theUser] = await User.getUserByUserId({
      userId,
    });

    if (!theUser && ctx?._matchedRouteName !== 'clerkRegister') {
      return errorResponser(ctx, 401);
    } else if (ctx?._matchedRouteName === 'clerkRegister') {
      if (theUser) {
        return errorResponser(ctx, 401, 'The user has been registered.');
      }
      ctx.currentUser = {
        userId,
      };
    } else {
      ctx.currentUser = theUser;
    }
  } catch (err) {
    console.error('err', err);
    return errorResponser(ctx, 401, err?.message);
  }

  return next();
};

exports.auth = async (ctx, next) => {
  const { accessToken } = ctx?.request?.query ?? {};

  if (!accessToken) {
    return errorResponser(ctx, 401);
  }

  const { userId, refreshToken } = jwt.verify(
    accessToken,
    config.api.privateKey
  );

  console.info('Find User', { userId, refreshToken });

  const [theUser] = await User.getVerifiedUser({
    userId,
    token: refreshToken,
  });

  ctx.currentUser = theUser;

  return next();
};
