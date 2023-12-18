const request = require('superagent');

const TOKEN =
    'kSXOd/NaV69WN+iSslfDYC8nWhs1rKy2aasv08bFz8dxDevRlCcT4TDWbphVeK6C/DhiswZq5sBULp/CiQ6DlqIyP3JbuFt'
    + 's8Fj6x30FVdmK8ZGimLmEvR8NPEg6uOnePeeymnHRtaT5e6Q5sflWDAdB04t89/1O/w1cDnyilFU=';
const API_ENDPOINT = 'https://api.line.me';

exports.sendMessage = async ({
  to = 'Ue58b74645bc9f723811406a1ad72562c',
  orderNum = 351,
  storeName = 'Store Name',
  time = '2023/10/30, 08:28 PM',
  items = [],
  amount = 3,
  price = 150,
}) => {
  const contents = [];

  const itemContents = items.forEach(item => {
    console.log(item);
    const itemContents = ([
      // 數量
      {
        type: "text",
        text: `［${item?.quantity}］`,
        margin: "none",
        size: "xs",
        flex: 0
      },
      // 名稱
      {
        type: "text",
        text: `${item?.name}`,
        size: "sm",
        color: "#555555",
        flex: 0
      },
      // 金額
      {
        type: "text",
        text: `NT$${item?.itemPayment}.00`,
        size: "sm",
        color: "#111111",
        align: "end"
      }
    ]);
    contents.push({
      type: "box",
      layout: "horizontal",
      contents: itemContents,
    });
    // 備註類
    contents.push(
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: item?.specialInstructions ?? 'xxxx',
            margin: "xxl",
            size: "xs",
            color: "#aaaaaa"
          }
        ]
      }
    );
  });

  console.log(contents);

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