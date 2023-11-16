const { errorResponser } = require('../libs/controller-helper');
const User = require('../models/user');

module.exports = async ctx => {
    const {
        request: {
            query: {
                token = null,
            } = {}
        } = {}
    } = ctx;
    
    const [theUser] = await User.getUserByToken({
        token,
        fields: [
            'authenticationMethod',
            'name',
            'phoneNumber',
            'emailAddress',
            'area',
        ]
    });

    if (!theUser) {
        return errorResponser(
            ctx,
            401,
            'The user not found.'
        )
    }

    ctx.body = theUser;
    return true;
}