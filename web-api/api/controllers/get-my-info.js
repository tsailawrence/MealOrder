const { errorResponser } = require('../libs/controller-helper');
const User = require('../models/user');

module.exports = async ctx => {
    const {
        request: {
            query: {
                token = null,
            } = {}
        } = {},
        currentUser: {
            userId = 'user_2YFWJPdzKRIfYlltWdEu3d03lh9',
            name = '冠宇 魏',
        }
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