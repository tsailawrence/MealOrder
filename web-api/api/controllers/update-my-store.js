const { errorResponser } = require('../libs/controller-helper');
const User = require('../models/user');
const Store = require('../models/store');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            storeId
        } = {},
        request: {
            body: {
                name,
                category,
                area,
                uri,
            } = {}
        } = {}
    } = ctx;

    let cdn = {}
  
    try {
      cloudinary.config(config.cloudinary);
      cdn = await cloudinary.uploader.upload(
        uri, 
        {
          folder: "image",
          width: 300,
          height: 480,
          crop: "crop"
        }
      );
    } catch (error) { 
        console.log(error);
      }

    const storeImage = cdn && cdn.secure_url ? cdn.secure_url : '';
    
    const data = {
        userId,
        name,
        category,
        area,
        storeImage,
    }

    // 遍历 data 对象的属性，如果属性值为 undefined 或 null 或空字符串，则从对象中删除该属性
    for (const key in data) {
        if (data[key] === undefined || data[key] === null || data[key] === "") {
        delete data[key];
        }
        }

    if (
        type !== User.TYPE.MERCHANT
    ) {
        return errorResponser(
            ctx,
            401,
            'Not a valid merchant'
        );
    }

    const theStore = await Store.updateStoreByStoreId({
        storeId,
        data,
    });

    ctx.body = {
        result: 'success'
    }
    
    
    return true;
}
