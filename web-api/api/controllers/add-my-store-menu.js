const { errorResponser } = require("../libs/controller-helper");

const Store = require("../models/store");
const MenuType = require("../models/menuType");
const Menu = require("../models/menu");
const User = require("../models/user");

module.exports = async (ctx) => {
  const {
    currentUser: { id: userId, type } = {},
    params: { storeId } = {},
    request: { body: { name, description, price, menuTypeId } = {} } = {},
  } = ctx;

  const [theStore] = await Store.getStoreByStoreId({
    storeId,
  });

  if (!theStore || type !== User.TYPE.MERCHANT || theStore.userId !== userId) {
    return errorResponser(ctx, 401, "Operation error.");
  }

  const theTypes = await MenuType.getMenuTypeByStoreId({
    storeId,
  });

  if (!theTypes.map(({ id }) => id).includes(menuTypeId)) {
    return errorResponser(ctx, 403, "Not a valid type.");
  }

  await Menu.insert({
    name,
    description,
    price,
    menuTypeId,
    storeId,
    onShelfStatus: 1,
  });

  ctx.body = {
    result: "success",
  };

  return true;
};
