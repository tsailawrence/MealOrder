const request = require('superagent');

const User = require('../models/user');
const datastore = require('../../db/mainDB');
const { sendMessage } = require('../controllers/handle-line-push');

const TOKEN =
    'kSXOd/NaV69WN+iSslfDYC8nWhs1rKy2aasv08bFz8dxDevRlCcT4TDWbphVeK6C/DhiswZq5sBULp/CiQ6DlqIyP3JbuFt'
    + 's8Fj6x30FVdmK8ZGimLmEvR8NPEg6uOnePeeymnHRtaT5e6Q5sflWDAdB04t89/1O/w1cDnyilFU=';
const API_ENDPOINT = 'https://api.line.me';

module.exports = async ctx => {
  const data = {};

  const [event] = ctx?.request?.body?.events ?? [];
  const { type, source, message, replyToken } = event || {};
  
  if (type === 'message') {
    data.replyToken = replyToken;
    data.messages = [];

    if (message?.text === '訂餐') {
      data.messages.push({
        type: 'text',
        text:
            '請點擊以下連結訂餐 \n https://foody-app.shop/customer/restaurant'
      });

      try {
        await request
          .post(`${API_ENDPOINT}/v2/bot/message/reply`)
          .set('Authorization', `Bearer ${TOKEN}`)
          .set('Content-Type', 'application/json')
          .send(data);
      } catch (err) {
        console.log('reply', err);
      }
    } else if (message?.text === '訂單') {
      const [theUser] = await User.getUserBySenderId({
        senderId: source?.userId,
        fields: ['id', 'name']
      });

      if (!theUser) {
        data.messages.push({
          type: 'text',
          text:
              `
                請點選下列連結進行綁定： \n
                https://foody-app.shop/customer/restaurant?sender_id=${source?.userId}
              `
        });

        try {
          await request
            .post(`${API_ENDPOINT}/v2/bot/message/reply`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .set('Content-Type', 'application/json')
            .send(data);
        } catch (err) {
          console.log('reply', err);
        }
      } else {
        // 趕時間直接暴力寫了
        const [orders] = await datastore.raw(`
          SELECT 
            Order.id,
            Order.payment,
            Store.name as storeName,
            OrderItem.quantity,
            OrderItem.payment as itemPayment,
            OrderItem.pickupTime,
            OrderItem.specialInstructions,
            Menu.name
          FROM \`Order\`
          LEFT JOIN Store ON Order.storeId = Store.id
          LEFT JOIN OrderItem ON OrderItem.OrderId = Order.id
          LEFT JOIN Menu ON OrderItem.MenuId = Menu.id
          WHERE customerId = ${theUser?.id}
          ORDER BY Order.id DESC
        `);

        theOrders = orders.filter(({ id }) => id === orders[0]?.id);
        
        await sendMessage({
          to: source?.userId || 'Ue58b74645bc9f723811406a1ad72562c',
          orderNum: theOrders[0]?.id,
          storeName: theOrders[0]?.storeName,
          storeName: theOrders[0]?.storeName,
          time: theOrders[0]?.pickupTime,
          items: theOrders.map(
            ({ name, quantity, itemPayment, specialInstructions }) => 
            ({ name, quantity, itemPayment, specialInstructions })
          ),
          amount: theOrders.reduce((acc, i) => acc + +i.quantity, 0),
          price: theOrders[0]?.payment,
        });
      }
    }
  }

  ctx.set('Content-Type', 'text/plain');
  ctx.body = 'success';

  return true;
};