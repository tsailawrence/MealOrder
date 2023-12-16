const request = require('superagent');

const User = require('../models/user');

const TOKEN =
    'kSXOd/NaV69WN+iSslfDYC8nWhs1rKy2aasv08bFz8dxDevRlCcT4TDWbphVeK6C/DhiswZq5sBULp/CiQ6DlqIyP3JbuFt'
    + 's8Fj6x30FVdmK8ZGimLmEvR8NPEg6uOnePeeymnHRtaT5e6Q5sflWDAdB04t89/1O/w1cDnyilFU=';
const API_ENDPOINT = 'https://api.line.me';

module.exports = async ctx => {
    
    const data = {};
    // const tasks = [];

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
      } else if (message?.text === '訂單') {
        const [theUser] = await User.getUserBySenderId({
          senderId: source?.userId,
          fields: ['id', 'name']
        });

        if (!theUser) {
          data.messages.push({
            type: 'text',
            text:
                '回傳綁定連結'
          });
        } else {
          data.messages.push({
            type: 'text',
            text:
                '回應近期最接近訂單 \n 待補'
          });
        }

        
      }
    }
    

    // if (type === 'message') {
    //     data.replyToken = replyToken;
    //     data.messages = [];

    //     if (message?.text === '訂餐') {
    //         data.messages.push({
    //             type: 'text',
    //             text:
    //                 '請點擊以下連結訂餐 \n 待補'
    //         });
    //     } else if (message?.text === '訂單') {
    //         data.messages.push({
    //             type: 'text',
    //             text:
    //                 '請點擊以下連結訂餐 \n 待補'
    //         });
    //     }
    // }
    // if (type === 'message') {
    //     data.replyToken = replyToken;
    //     data.messages = [];

    //     // 擷取句子中的 url
    //     const urls = extractURLs(message?.text);

    //     const [theUser] = await getUserBySenderId({
    //         senderId: source?.userId,
    //         fields: ['id', 'name']
    //     });

    //     if (!theUser) {
    //         data.messages.push({
    //             type: 'text',
    //             text:
    //                 'Hi, 這裡是tripllo 智能旅程規劃，請點選下方Tripllo網址完成登入與LINE綁定' +
    //                 `https://tripllo.site/?sender=${source?.userId}`
    //         });
    //     } else if (urls?.length) {
    //         urls.forEach(async url => {
    //             data.messages.push({
    //                 type: 'text',
    //                 text: `已為您紀錄 ${url}`
    //             });

    //             const response = await fetch({ url });
    //             const result = await parseInfoFromUrlResponse({
    //                 url,
    //                 response
    //             });

    //             if (result?.title) {
    //                 data.messages.push({
    //                     type: 'text',
    //                     text: result?.title
    //                 });
    //             }

    //             data.messages.push({
    //                 type: 'text',
    //                 text: `到 https://tripllo.site 上查看吧！`
    //             });

    //             const prompt =
    //                 `<${result?.title ?? ''} & ${result?.description ??
    //                     ''}> 根據<>中內容，給予一個旅遊景點或餐廳的形容詞+描述，最大字數為20字，仿造下方格式以JSON格式回傳，除了JSON不要回其他內容` +
    //                 '{ "title": // 該景點或咖啡廳名稱，例如：台中最美咖啡廳，花苑咖啡廳, "tags": // 該景點的標籤，以陣列回答，沒有回答空陣列，例如：["咖啡廳", "台中"] }';
    //             const completion = await sendChatGPTRequest(prompt);
    //             const aiResults = JSON.parse(completion);

    //             tasks.push(
    //                 insertFavoriteListTask({
    //                     userId: theUser?.id,
    //                     url,
    //                     title: aiResults.title || (result?.title ?? null),
    //                     description: result?.description ?? null,
    //                     imageUrl: result?.images?.[0] ?? null,
    //                     tags: aiResults?.tags ?? []
    //                 })
    //             );
    //         });
    //     } else {
    //         data.messages.push({
    //             type: 'text',
    //             text: `Hi, ${theUser?.name}, 這裡是Tripllo 智能旅程規劃`
    //         });

    //         data.messages.push({
    //             type: 'text',
    //             text: '分享網址讓Tripllo幫你記錄吧！'
    //         });
    //     }
    // }

    // try {
    //     await request
    //         .post(`${API_ENDPOINT}/v2/bot/message/reply`)
    //         .set('Authorization', `Bearer ${TOKEN}`)
    //         .set('Content-Type', 'application/json')
    //         .send(data);
    // } catch (err) {
    //     console.log('reply', err);
    // }

    try {
        await request
        .post(`${API_ENDPOINT}/v2/bot/message/push`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .set('Content-Type', 'application/json')
        .send(data);
    } catch (err) {
        console.log('push', err);
    }
    

    // await Promise.all([tasks]);

    ctx.set('Content-Type', 'text/plain');
    ctx.body = 'success';

    return true;
};

const sendMessage = async ({
  to = 'Ue58b74645bc9f723811406a1ad72562c',
  orderNum = 351,
  storeName = 'Store Name',
  time = '2023/10/30, 08:28 PM',
  items = [],
  amount = 3,
  price,
}) => {
  const contents = [];

  
  contents.push({
    type: "box",
    layout: "horizontal",
    contents: [
      // 數量
      {
        type: "text",
        text: "［1］",
        margin: "none",
        size: "xs",
        flex: 0
      },
      // 名稱
      {
        type: "text",
        text: "Vegetable Mixups",
        size: "sm",
        color: "#555555",
        flex: 0
      },
      // 金額
      {
        type: "text",
        text: "NT$150.00",
        size: "sm",
        color: "#111111",
        align: "end"
      }
    ]
  });

  // 備註類
  contents.push([
    {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: "No Spicy",
          margin: "xxl",
          size: "xs",
          color: "#aaaaaa"
        }
      ]
    }
  ]);

  try {
    await request
      .post(`${API_ENDPOINT}/v2/bot/message/push`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({
        to,
          messages:[ // order
            {
              type: "flex",
              altText: "Order",
                contents: {
                    type: "bubble",
                    body: {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "text",
                          weight: "bold",
                          color: "#1DB446",
                          size: "sm",
                          text: `Order #${orderNum}`
                        },
                        {
                          type: "text",
                          text: storeName,
                          weight: "bold",
                          size: "xxl",
                          margin: "md"
                        },
                        {
                          type: "text",
                          text: time,
                          size: "xs",
                          color: "#aaaaaa",
                          wrap: true
                        },
                        {
                          type: "separator",
                          margin: "xxl"
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          margin: "xxl",
                          spacing: "sm",
                          contents
                        },
                        {
                          type: "separator",
                          margin: "xxl"
                        },
                        // 結算區域
                        {
                          type: "box",
                          layout: "horizontal",
                          margin: "md",
                          contents: [
                            {
                              type: "text",
                              text: `${amount} Items`,
                              size: "xs",
                              color: "#aaaaaa",
                              flex: 0
                            },
                            {
                              type: "text",
                              text: `NT$${price}`,
                              color: "#aaaaaa",
                              size: "xs",
                              align: "end"
                            }
                          ]
                        }
                      ]
                    },
                    styles: {
                      footer: {
                        separator: true
                      }
                    }
                }
              }
          ]
      });
  } catch (err) {
      console.log('push', err);
  }
}