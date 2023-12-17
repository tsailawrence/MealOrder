const datastore = require("../../db/mainDB");

const { getTaipeiNowStr } = require("../utils/index");

const TABLE_NAME = "Order";
const TABLE_ITEM = "OrderItem";
const TABLE_ITEM_NOTE = "OrderItemNote";
const TABLE_MENU = "Menu";

exports.getOrderByStoreId = ({ storeId, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("storeId", storeId);

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
    .where(
      "orderId",
      "IN",
      theOrders.map(({ id }) => id)
    );

  const orderItemsMap = theOrderItems.reduce((acc, { orderId, ...item }) => {
    if (!acc[orderId]) {
      acc[orderId] = [];
    }
    acc[orderId].push(item);
    return acc;
  }, {});

  const theOrderItemNotes = await datastore
    .select(["orderItemId", "note"])
    .from(TABLE_ITEM_NOTE)
    .where(
      "orderItemId",
      "IN",
      theOrderItems.map(({ id }) => id)
    );

  const orderItemNotesMap = theOrderItemNotes.reduce((acc, item) => {
    if (!acc[item.orderItemId]) {
      acc[item.orderItemId] = [];
    }
    acc[item.orderItemId].push(item);
    return acc;
  }, {});

  return theOrders.map((order) => ({
    ...order,
    orderItems: (orderItemsMap?.[order?.id] ?? []).map((item) => ({
      ...item,
      note: orderItemNotesMap?.[item?.id] ?? [],
    })),
  }));
};

exports.getOrderByCustomerId = async ({ userId, fields = "*" }) => {
  const orders = await datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("customerId", userId);

  const theOrderWithItems = await Promise.all(
    orders.map(async (order) => {
      const orderItem = await datastore
        .select(fields)
        .from(TABLE_ITEM)
        .where("orderId", order.id);
      return {
        ...order,
        orderItem: orderItem,
      };
    })
  );
  return theOrderWithItems;
};

exports.getCurrentMonthOrderByCustomerId = async ({ userId, fields = "*" }) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1); // 將日期設為本月的第一天

  const currentMonthEnd = new Date();
  currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1, 0); // 將日期設為本月的最後一天

  const orders = await datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("customerId", userId)
    .whereBetween("time", [currentMonthStart, currentMonthEnd]);

  const theOrderWithItems = await Promise.all(
    orders.map(async (order) => {
      const orderItem = await datastore
        .select(fields)
        .from(TABLE_ITEM)
        .where("orderId", order.id);
      return {
        ...order,
        orderItem: orderItem,
      };
    })
  );

  return theOrderWithItems;
};

exports.insert = async (data, items) => {
  let returnId = -1;
  await datastore
    .insert(
      Object.assign(data, {
        time: getTaipeiNowStr("YYYY-MM-DD HH:mm:ss"),
      })
    )
    .into(TABLE_NAME)
    .returning("id")
    .then(function([id]) {
      returnId = id;
    });

  await items.map(async (orderItem) => {
    await datastore
      .insert(
        Object.assign(orderItem, {
          orderId: returnId,
        })
      )
      .into(TABLE_ITEM);
  });
};

exports.updateOrderByOrderId = async ({ orderId, data }) =>
  datastore
    .from(TABLE_NAME)
    .where("id", orderId)
    .update(data);

exports.deleteOrderByOrderId = ({ orderId }) =>
  datastore
    .from(TABLE_NAME)
    .where({ id: orderId })
    .del();
