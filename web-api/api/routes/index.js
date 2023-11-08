const Router = require('koa-router');
const config = require('config');
const validate = require('koa2-validation');
const Joi = require('joi');

const { rejectTheRequest } = require('../utils/error');
const { auth } = require('../middleware/index');

const createMyFavorite = require('../controllers/create-my-favorite');
const deleteMyFavorite = require('../controllers/delete-my-favorite');
const updateMyFavorite = require('../controllers/update-my-favorite');
const getMyFavorite = require('../controllers/get-my-favorite');
const callPredict = require('../controllers/call-predict');

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

router.post(
    '/my/favorite',
    validate({
        body: Joi.object().keys({
            city: Joi.string().required(),
            userId: Joi.number().required(),
        }),
    }),
    createMyFavorite
);

router.put(
    '/my/favorite',
    validate({
        body: Joi.object().keys({
            city: Joi.string().required(),
            userId: Joi.number().required(),
        }),
    }),
    updateMyFavorite
);

router.get(
    '/my/favorite',
    validate({
        query: {
            userId: Joi.number().required(),
        }
    }),
    getMyFavorite
);

router.delete(
    '/my/favorite',
    validate({
        query: {
            userId: Joi.number().required(),
        }
    }),
    deleteMyFavorite
);

router.get('/call_predict', callPredict);

// bad request example
router.get('/error', async () => {
    throw rejectTheRequest({
        status: 400,
        message: { message: 'error', code: 404 }
    });
});

module.exports = router;
