FROM node:18-alpine

RUN yarn install

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

