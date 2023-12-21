const Koa = require('koa');
const { v4: UUID } = require('uuid');
const Logger = require('./utils/koa-logger');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const router = require('./routes');

const allowedOrigins = [
  // 'https://foody-app.shop',
  // 'https://0.0.0.0:3000',
  'http://localhost:3000',
];

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
      multipart: true,
    })
  );
  // cross domain
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  // register routers
  app.use(router.routes()).use(router.allowedMethods());

  return app;
};

module.exports = init;
