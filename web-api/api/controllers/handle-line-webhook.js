const request = require('superagent');
// const charset = require('charset');
// const cheerio = require('cheerio');
// const jschardet = require('jschardet');
// const encoding = require('encoding');
// const striptags = require('striptags');

// const { getUserBySenderId } = require('../models/user');
// const {
//     insert: insertFavoriteList,
//     insertTag
// } = require('../models/user-favorite-list');
// const { sendChatGPTRequest } = require('../libs/chatgpt-api');

const TOKEN =
    'kSXOd/NaV69WN+iSslfDYC8nWhs1rKy2aasv08bFz8dxDevRlCcT4TDWbphVeK6C/DhiswZq5sBULp/CiQ6DlqIyP3JbuFt'
    + 's8Fj6x30FVdmK8ZGimLmEvR8NPEg6uOnePeeymnHRtaT5e6Q5sflWDAdB04t89/1O/w1cDnyilFU=';
const API_ENDPOINT = 'https://api.line.me';
// const DEFAULT_USER_AGENT =
//     'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
// const DEFAULT_REFERER = 'http://www.facebook.com/';

// const extractURLs = text =>
//     text.match(/(https?:\/\/[^\s\uFF00-\uFFFF<>"'!]+)/g);

// const getCharSet = response => {
//     const detected =
//         charset(response.header, response.data) ||
//         jschardet.detect(response.data).encoding;

//     return detected ? detected.toUpperCase() : 'UTF-8';
// };

// const fetch = async ({ url }) => {
//     try {
//         const result = await request('GET', url)
//             .set('User-Agent', DEFAULT_USER_AGENT)
//             .set('Referer', DEFAULT_REFERER)
//             .timeout({
//                 response: 5000,
//                 deadline: 20000
//             });

//         return {
//             data: result?.text || result?.data || null,
//             header: result?.header || null
//         };
//     } catch (err) {
//         if (err.response || err.code) {
//             return {
//                 header: err.response.header,
//                 status: err.status,
//                 content: err.response.text || err.response.body
//             };
//         }

//         return false;
//     }
// };

// const htmlEscapes = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#x27;',
//     '/': '&#x2F;'
// };

// const htmlEscaper = /[&<>"'/]/g;

// const escapeHTML = str => {
//     if (!str) return '';
//     return `${str}`.replace(htmlEscaper, match => htmlEscapes[match]);
// };

// const getTitle = $ =>
//     escapeHTML(
//         $('meta[property="og:title"]').attr('content') ||
//             $('title')
//                 .text()
//                 .trim()
//     ).replace(/\s+/g, ' ');

// const getDescriptionFromBody = $ =>
//     striptags(
//         $('body')
//             .first()
//             .text()
//             .replace('#<script(.*?)>(.*?)</script>#is', '')
//             .replace('#<style(.*?)>(.*?)</style>#is', '')
//     );

// const getDescription = $ => {
//     const ogDescription = $('meta[property="og:description"]').attr('content');
//     const metadescription = $('meta[name="description"]').attr('content');
//     const metaDescription = $('meta[name="Description"]').attr('content');
//     const twitterDescription = $('meta[name="twitter:description"]').attr(
//         'content'
//     );

//     return escapeHTML(
//         (ogDescription && ogDescription.length ? ogDescription : null) ||
//             (metadescription && metadescription.length
//                 ? metadescription
//                 : null) ||
//             (metaDescription && metaDescription.length
//                 ? metaDescription
//                 : null) ||
//             (twitterDescription && twitterDescription.length
//                 ? twitterDescription
//                 : null) ||
//             striptags(
//                 $('p')
//                     .first()
//                     .text()
//             ) ||
//             getDescriptionFromBody($)
//     ).replace(/\s+/g, ' ');
// };

// const parseInfoFromUrlResponse = async ({ response }) => {
//     if (!response || !response?.header) return null;

//     try {
//         const charSet = getCharSet(response);
//         const options = { decodeEntities: false };
//         const data = encoding.convert(response.data, 'UTF-8', charSet);
//         const $ = cheerio.load(data, options);

//         const title = getTitle($);
//         const description = getDescription($);
//         const images = [];

//         $('meta[property="og:image"]').each((i, img) => {
//             const src = $(img).attr('src') || $(img).attr('content');

//             if (src && !images.includes(src)) {
//                 images.push(src);
//             }
//         });

//         console.log('title', title, description, images);
//         return {
//             title,
//             description,
//             images
//         };
//     } catch {
//         return {};
//     }
// };

// const insertFavoriteListTask = async ({
//     userId,
//     url,
//     title,
//     description,
//     imageUrl,
//     tags
// }) => {
//     const [favoriteListId] = await insertFavoriteList({
//         user_id: userId,
//         url,
//         title,
//         description,
//         image_url: imageUrl
//     });

//     return Promise.all(
//         tags.map(tag =>
//             insertTag({
//                 favorite_list_id: favoriteListId,
//                 name: tag
//             })
//         )
//     );
// };

module.exports = async ctx => {
    
    const data = {};
    // const tasks = [];

    const [event] = ctx?.request?.body?.events ?? [];
    const { type, source, message, replyToken } = event || {};

    console.log(event);
    
    

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
        .send({
            to: "Ue58b74645bc9f723811406a1ad72562c",
            messages:[
                {
                    type: "flex",
                    altText: "Order",
                    contents: {
                        "type": "bubble",
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "weight": "bold",
                              "color": "#1DB446",
                              "size": "sm",
                              "text": "Order #351"
                            },
                            {
                              "type": "text",
                              "text": "餐廳名稱",
                              "weight": "bold",
                              "size": "xxl",
                              "margin": "md"
                            },
                            {
                              "type": "text",
                              "text": "2023/10/30, 08:28 PM",
                              "size": "xs",
                              "color": "#aaaaaa",
                              "wrap": true
                            },
                            {
                              "type": "separator",
                              "margin": "xxl"
                            },
                            {
                              "type": "box",
                              "layout": "vertical",
                              "margin": "xxl",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "box",
                                  "layout": "horizontal",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "［1］",
                                      "margin": "none",
                                      "size": "xs",
                                      "flex": 0
                                    },
                                    {
                                      "type": "text",
                                      "text": "Vegetable Mixups",
                                      "size": "sm",
                                      "color": "#555555",
                                      "flex": 0
                                    },
                                    {
                                      "type": "text",
                                      "text": "NT$150.00",
                                      "size": "sm",
                                      "color": "#111111",
                                      "align": "end"
                                    }
                                  ]
                                },
                                {
                                  "type": "box",
                                  "layout": "horizontal",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "No Spicy",
                                      "margin": "xxl",
                                      "size": "xs",
                                      "color": "#aaaaaa"
                                    }
                                  ]
                                },
                                {
                                  "type": "box",
                                  "layout": "horizontal",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "No Cheese",
                                      "margin": "xxl",
                                      "size": "xs",
                                      "color": "#aaaaaa"
                                    }
                                  ]
                                },
                                {
                                  "type": "box",
                                  "layout": "horizontal",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "［2］",
                                      "flex": 0,
                                      "size": "xs"
                                    },
                                    {
                                      "type": "text",
                                      "text": "Grilled Chicken",
                                      "size": "sm",
                                      "color": "#555555",
                                      "flex": 0
                                    },
                                    {
                                      "type": "text",
                                      "text": "NT$500.00",
                                      "size": "sm",
                                      "color": "#111111",
                                      "align": "end"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "separator",
                              "margin": "xxl"
                            },
                            {
                              "type": "box",
                              "layout": "horizontal",
                              "margin": "md",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "3 Items",
                                  "size": "xs",
                                  "color": "#aaaaaa",
                                  "flex": 0
                                },
                                {
                                  "type": "text",
                                  "text": "NT$650.00",
                                  "color": "#aaaaaa",
                                  "size": "xs",
                                  "align": "end"
                                }
                              ]
                            }
                          ]
                        },
                        "styles": {
                          "footer": {
                            "separator": true
                          }
                        }
                      }
                }
            ]
        });
    } catch (err) {
        console.log('push', err);
    }
    

    // await Promise.all([tasks]);

    ctx.set('Content-Type', 'text/plain');
    ctx.body = 'success';

    return true;
};