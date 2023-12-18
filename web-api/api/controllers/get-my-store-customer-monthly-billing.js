const { errorResponser } = require('../libs/controller-helper');

const Store = require('../models/store');
const Order = require('../models/order');
const User = require('../models/user');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        params: {
            storeId,
            month
        } = {},
    } = ctx;

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

    if (
        !theStore
        || type !== User.TYPE.MERCHANT
    ) {
        return errorResponser(
            ctx,
            401,
            'Not a valid merchant'
        );
    }

    const theOrders = await Order.getOrdersDetailByStoreId({
        storeId: theStore?.id,
    });

    const theOrdersByMonth  = theOrders.filter(order => {
        // 获取订单的年月部分，格式为 "YYYYMM"
        const orderMonth = order.time.slice(0, 7).replace('-', '');
      
        // 判断是否与目标月份匹配
        return orderMonth === month;
      });

    const theCustomerSet = new Map() 

    for (const order of theOrdersByMonth) {
        const customerId = order.customerId;
      
        if (!theCustomerSet.has(customerId)) {
          const [theCustomer] = await User.getUserById({
            id: customerId,
          });
      
          const theCustomerWithTotalPayment = {
            customerId: theCustomer.id,
            customerName: theCustomer.name,
            totalOrders: 1,
            totalCosts: order.payment,
          };
      
          theCustomerSet.set(customerId, theCustomerWithTotalPayment);
        } else {
          const theCustomerWithTotalPayment = {
            customerId: theCustomerSet.get(customerId).customerId,
            customerName: theCustomerSet.get(customerId).customerName,
            totalOrders: theCustomerSet.get(customerId).totalOrders + 1,
            totalCosts: theCustomerSet.get(customerId).totalCosts + order.payment,
          };
      
          theCustomerSet.set(customerId, theCustomerWithTotalPayment);
        }
      }
      

    const StoreCustomerBill= Array.from(theCustomerSet.values());;

    ctx.body = StoreCustomerBill;
    
    return true;
}