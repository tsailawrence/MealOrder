const { errorResponser } = require("../libs/controller-helper");

const Store = require("../models/store");
const User = require("../models/user");

module.exports = async (ctx) => {
    const {
        params: {
            storeId
        } = {},
    } = ctx;

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

  if (!theStore || type !== User.TYPE.MERCHANT) {
    return errorResponser(ctx, 401, "Not a valid merchant");
  }

  if( theStore.userId !== userId){
    const [usrInfo] = await User.getUserById({
        id: userId,
    });
    if(usrInfo.isAdmin != true){
        return errorResponser(
            ctx,
            401,
            'Operation error.'
        );
    }
}

  ctx.body = theStore;

  return true;
};
