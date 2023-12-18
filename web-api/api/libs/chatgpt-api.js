const config = require('config');
const request = require('superagent');

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

const { token } = config.chatGPT;

exports.sendChatGPTRequest = async text => {
    console.log('prompt', text);
    const res = await request
        .post(API_ENDPOINT)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({
            model: MODEL,
            messages: [
                {
                    role: 'user',
                    content: text
                }
            ]
        });

    return res?.body?.choices?.[0]?.message?.content;
};
