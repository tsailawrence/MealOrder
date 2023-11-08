const { errorResponser } = require('../libs/controller-helper');

exports.auth = async (ctx, next) => {
    return next();
};
