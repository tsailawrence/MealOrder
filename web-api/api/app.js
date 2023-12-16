const Koa = require('koa');
const { v4: UUID } = require('uuid');
const Logger = require('./utils/koa-logger');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const router = require('./routes');

const init = () => {
    const app = new Koa();

    // setup request uuid
    app.use((ctx, next) => {
        const uuid = UUID();

        ctx.uuid = uuid;
        return next();
    });
    // log for the api call
    app.use(Logger());
    // set post json limit for image upload and parse multipart body
    app.use(
        koaBody({
            jsonLimit: '2mb',
            multipart: true
        })
    );
    // cross domain
    app.use(cors({
        origin: 'http://localhost:3000', // Allow only http://localhost:3000 to access
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // Allow these headers
        credentials: true, // Allow cookies
    }));

    // register routers
    app.use(router.routes()).use(router.allowedMethods());

    return app;
};

module.exports = init;
