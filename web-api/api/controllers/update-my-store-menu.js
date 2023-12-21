const { errorResponser } = require('../libs/controller-helper');
const cloudinary = require('cloudinary').v2;
const config = require('config');

const Store = require('../models/store');
const MenuType = require('../models/menuType');
const Menu = require('../models/menu');
const User = require('../models/user');

module.exports = async ctx => {
  const {
    currentUser: { id: userId, type } = {},
    params: { storeId, menuId } = {},
    request: {
      body: {
        name,
        description,
        price,
        menuTypeId,
        amount,
        uri,
        onShelfStatus,
      } = {},
    } = {},
  } = ctx;

  let cdn = {};

  try {
    cloudinary.config(config.cloudinary);
    cdn = await cloudinary.uploader.upload(uri, {
      folder: 'image',
      width: 400,
      height: 400,
      crop: 'crop',
    });
  } catch (error) {
    console.log(error);
  }

  const menuImage = cdn && cdn.secure_url ? cdn.secure_url : '';
  const data = {
    name,
    description,
    price,
    amount,
    menuTypeId,
    menuImage,
    onShelfStatus,
  };
  // 遍历 data 对象的属性，如果属性值为 undefined 或 null 或空字符串，则从对象中删除该属性
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      delete data[key];
    }
  }

  const [theStore] = await Store.getStoreByStoreId({
    storeId,
  });

  if (!theStore || type !== User.TYPE.MERCHANT) {
    return errorResponser(ctx, 401, 'Operation error.');
  }

  if (theStore.userId !== userId) {
    const [usrInfo] = await User.getUserById({
      id: userId,
    });
    if (usrInfo.isAdmin != true) {
      return errorResponser(ctx, 401, 'Operation error.');
    }
  }

  const theTypes = await MenuType.getMenuTypeByStoreId({
    storeId,
  });

  if (menuTypeId) {
    if (!theTypes.map(({ id }) => id).includes(menuTypeId)) {
      return errorResponser(ctx, 403, 'Not a valid type.');
    }
  }

  const theMenu = await Menu.update({
    data,
    menuId,
  });

  ctx.body = {
    result: 'success',
  };
  return true;
};
