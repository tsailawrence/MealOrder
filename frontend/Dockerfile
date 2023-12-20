FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

# COPY .next ./.next

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]