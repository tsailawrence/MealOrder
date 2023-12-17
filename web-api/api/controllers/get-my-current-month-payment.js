const { errorResponser } = require('../libs/controller-helper');

const Order = require('../models/order');
const Store = require('../models/store');
const Menu = require('../models/menu');

module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
    } = ctx;

    const theUserOrders = await Order.getCurrentMonthOrderByCustomerId({
        userId,
    });

    const theUserOrdersWithStore = await Promise.all(theUserOrders.map(async (order)=>{
        const storeId = order.storeId
        const [theStore] = await Store.getStoreByStoreId({
            storeId,
        });

        return {
            ...order,
            storeInfo: theStore
        }


    }))

    const theUserOrdersWithStoreAndMenu = await Promise.all(theUserOrdersWithStore.map(async (order)=>{
        const orderItems = order.orderItem

        const orderItemsWithMenu = await Promise.all(orderItems.map(async (orderItem)=>{
            const menuId =orderItem.menuId;
            const [theMenu] = await Menu.getMenuByMenuId({
                menuId,
            });

    
            return {
                ...orderItem,
                name: theMenu.name
            }
    
    
        }))

        return {
            ...order,
            orderItem: orderItemsWithMenu
        }


    }))

    ctx.body = theUserOrdersWithStoreAndMenu;
    
    return true;
}