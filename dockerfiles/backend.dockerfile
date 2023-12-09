FROM node:18-alpine

WORKDIR /web-api
COPY /web-api/package.json /web-api/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY /web-api/ ./
EXPOSE 3000

CMD ["yarn", "start"]