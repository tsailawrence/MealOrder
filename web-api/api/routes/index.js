const Router = require('koa-router');
const config = require('config');
const validate = require('koa2-validation');
const Joi = require('joi');

const { rejectTheRequest } = require('../utils/error');
const { auth } = require('../middleware/index');

const getMyInfo = require('../controllers/get-my-info');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const router = new Router();

router.use('*', async (ctx, next) => {
    const meta = {
        version: config.api.version,
        request: {
            url: ctx.params[0],
            query: Object.assign({}, ctx.request.query, ctx.request.body)
        }
    };

    try {
        const { _url: url } = ctx.request?.body;
        if (url) {
            ctx.request.body.url = url;
        }

        await next();

        if (ctx.response.status === 200) {
            const finalBody = { data: ctx.body };

            if (Array.isArray(ctx.body)) {
                finalBody.count = ctx.body.length;
            }

            if (ctx.nextIndex) {
                finalBody.nextIndex = ctx.nextIndex;
            }

            if (ctx.totalPage) {
                finalBody.totalPage = ctx.totalPage;
            }

            finalBody.meta = meta;
            ctx.body = finalBody;
        }
        // error handling
    } catch (err) {
        if (err?.isBoom) {
            ctx.status = err.output.statusCode;
            ctx.body = {
                error: err.output.payload.error,
                message: err.message
            };
        } else {
            ctx.status = err?.status || 500;
            ctx.body = {
                message: err?.message || 'Something wrong.'
            };
            if (ctx.status === 500) {
                ctx.body.error = 'Internal Server Error';
            }
            ctx.app.emit('error', err, ctx);
        }
    }
});

// 200 example and health check route
router.get('/', async ctx => {
    ctx.body = 'success';
});

router.get(
    '/my/info',
    validate({
        query: {
            token: Joi.string().required(),
        }
    }),
    getMyInfo
);

// bad request example
router.get('/error', async () => {
    throw rejectTheRequest({
        status: 400,
        message: { message: 'error', code: 404 }
    });
});

module.exports = router;
