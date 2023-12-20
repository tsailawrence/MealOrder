FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY .next ./.next

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]