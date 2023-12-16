const { errorResponser } = require("../libs/controller-helper");

const Store = require("../models/store");
const MenuType = require("../models/menuType");
const User = require("../models/user");

module.exports = async (ctx) => {
  const {
    currentUser: { id: userId, type } = {},
    params: { storeId, menuTypeId } = {},
    request: { body: { value } = {} } = {},
  } = ctx;

  const [theStore] = await Store.getStoreByStoreId({
    storeId,
  });

  if (!theStore || type !== User.TYPE.MERCHANT || theStore.userId !== userId) {
    return errorResponser(ctx, 401, "Operation error.");
  }
  const data = { type: value };
  await MenuType.update({ menuTypeId, data });

  ctx.body = {
    result: "success",
  };

  return true;
};
