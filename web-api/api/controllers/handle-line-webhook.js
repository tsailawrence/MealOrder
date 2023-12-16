const request = require('superagent');

const User = require('../models/user');
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
              '請點擊以下連結訂餐 \n 待補'
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
                  http://localhost:3000/customer/restaurant?sender_id=${source?.userId}
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
          await sendMessage({});
        }
      }
    }

    ctx.set('Content-Type', 'text/plain');
    ctx.body = 'success';

    return true;
};