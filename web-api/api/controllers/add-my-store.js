const { errorResponser } = require("../libs/controller-helper");
const User = require("../models/user");
const Store = require("../models/store");
const cloudinary = require("cloudinary").v2;
const config = require("config");

module.exports = async (ctx) => {
  const {
    currentUser: { id: userId, type } = {},
    request: { body: { name, category, area, uri } = {} } = {},
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

  const storeImage = cdn && cdn.secure_url ? cdn.secure_url : "";

  const data = {
    userId,
    name,
    category,
    area,
    storeImage,
  };

  if (type !== User.TYPE.MERCHANT) {
    return errorResponser(ctx, 401, "Not a valid merchant");
  }

  const [theStore] = await Store.addStoreByUserId({
    data,
  });

  ctx.body = {
    result: "success",
  };

  return true;
};
