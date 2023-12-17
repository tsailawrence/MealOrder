const { errorResponser } = require('../libs/controller-helper');

const User = require('../models/user');
const Order = require('../models/order');
const sendEmail = require('../utils/email');
module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        request: {
            body: {
                storeId,
                payment,
                pickupTime,
                items,
            } = {}
        } = {}
    } = ctx;

    await Order.insert({
        customerId: userId,
        storeId: storeId,
        status: 'Comfirmed',
        payment: payment,
        pickupTime: pickupTime,
    },items);
   const [usrInfo] = await User.getUserById({
        id: userId,
    });



    if (usrInfo) {
        await sendEmail(
            usrInfo.emailAddress,
          '訂單成功寄送',
          '',
          ``,
        );
      }
    
    ctx.body = {
        result: 'success'
    };
    
    return true;
}