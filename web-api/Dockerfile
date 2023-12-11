FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install && yarn cache clean

RUN npm install -f

COPY . /app

CMD ["yarn", "start"]

EXPOSE 3001