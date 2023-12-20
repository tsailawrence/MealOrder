const { errorResponser } = require("../libs/controller-helper");

const Store = require("../models/store");
const MenuType = require("../models/menuType");
const Menu = require("../models/menu");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const config = require("config");

module.exports = async (ctx) => {
  const {
    currentUser: { id: userId, type } = {},
    params: { storeId } = {},
    request: { body: { name, description, price, menuTypeId,amount, uri } = {} } = {},
  } = ctx;

  let cdn = {};

  try {
    cloudinary.config(config.cloudinary);
    cdn = await cloudinary.uploader.upload(uri, {
      folder: "image",
      width: 400,
      height: 400,
      crop: "crop",
    });
  } catch (error) {
    console.log(error);
  }

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

  const menuImage = cdn && cdn.secure_url ? cdn.secure_url : "";

  await Menu.insert({
    name,
    description,
    price,
    menuTypeId,
    storeId,
    onShelfStatus: 1,
    amount,
    menuImage,
  });

  ctx.body = {
    result: "success",
  };

  return true;
};
