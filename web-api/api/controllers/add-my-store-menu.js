const { errorResponser } = require("../libs/controller-helper");

const Store = require("../models/store");
const MenuType = require("../models/menuType");
const Menu = require("../models/menu");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const config = require('config');

module.exports = async (ctx) => {
  const {
    currentUser: { id: userId, type } = {},
    params: { storeId } = {},
    request: { body: { name, description, price, menuTypeId,uri } = {} } = {},
  } = ctx;

  cloudinary.config(config.cloudinary);
  // const cdn = await cloudinary.uploader.upload(
  //   uri, 
  //   {
  //     folder: "image",
  //     width: 300, // 解析度 自己調
  //     height: 480,
  //     crop: "crop"
  //   }
  // );

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
    // menuImage:cdn,
  });

  ctx.body = {
    result: "success",
  };

  return true;
};
