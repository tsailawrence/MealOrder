const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'Order';
const TABLE_ITEM = 'OrderItem';
const TABLE_ITEM_NOTE = 'OrderItemNote';
const TABLE_MENU = 'Menu';

exports.getOrderByStoreId = ({ storeId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('storeId', storeId);

exports.getOrdersDetailByStoreId = async ({ storeId }) => {
    const theOrders = await this.getOrderByStoreId({
        storeId,
    });

    const theOrderItems = await datastore
        .select([
            `${TABLE_ITEM}.id`,
            `${TABLE_ITEM}.orderId`,
            `${TABLE_ITEM}.quantity`,
            `${TABLE_ITEM}.payment`,
            `${TABLE_ITEM}.menuId`,
            `${TABLE_MENU}.name`,
        ])
        .from(TABLE_ITEM)
        .leftJoin(TABLE_MENU, `${TABLE_MENU}.id`, `${TABLE_ITEM}.menuId`)
        .where('orderId', 'IN', theOrders.map(({ id }) => id));
    
    const orderItemsMap = theOrderItems.reduce(
        (acc, { orderId, ...item }) => {
            if (!acc[orderId]) {
                acc[orderId] = [];
            }
            acc[orderId].push(item);
            return acc;
        }, {}
    );

    const theOrderItemNotes = await datastore
        .select([
            'orderItemId',
            'note'
        ])
        .from(TABLE_ITEM_NOTE)
        .where('orderItemId', 'IN', theOrderItems.map(({ id }) => id));

    const orderItemNotesMap = theOrderItemNotes.reduce(
        (acc, item) => {
            if (!acc[item.orderItemId]) {
                acc[item.orderItemId] = [];
            }
            acc[item.orderItemId].push(item);
            return acc;
        }, {}
    );

    return theOrders.map(order => ({
        ...order,
        orderItems: (orderItemsMap?.[order?.id] ?? [])
            .map(item => ({
                ...item,
                note: orderItemNotesMap?.[item?.id] ?? [],
            }))
    }));
}