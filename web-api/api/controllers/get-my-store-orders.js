const { errorResponser } = require("../libs/controller-helper");

const Store = require("../models/store");
const Order = require("../models/order");
const User = require("../models/user");

module.exports = async (ctx) => {
  const { currentUser: { id: userId, type } = {} } = ctx;

  const [theStore] = await Store.getStoreByUserId({
    userId,
  });

  if (!theStore || type !== User.TYPE.MERCHANT) {
    return errorResponser(ctx, 401, "Not a valid merchant");
  }

  const theOrders = await Order.getOrdersDetailByStoreId({
    storeId: theStore?.id,
  });

  ctx.body = theOrders;

  return true;
};
