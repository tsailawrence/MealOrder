const { errorResponser } = require("../libs/controller-helper");
const User = require("../models/user");
const Store = require("../models/store");
const cloudinary = require("cloudinary").v2;
const config = require('config');

module.exports = async (ctx) => {
  const {
    currentUser: { id: userId, type } = {},
    request: { body: { name, category, area, uri } = {} } = {},
  } = ctx;

  cloudinary.config(config.cloudinary);
//   const cdn = await cloudinary.uploader.upload(
//     uri, 
//     {
//       folder: "image",
//       width: 300, // 解析度 自己調
//       height: 480,
//       crop: "crop"
//     }
//   );

  const data = {
    userId,
    name,
    category,
    area,
    // storeImage:cdn,
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
