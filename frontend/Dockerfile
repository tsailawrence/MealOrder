FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

<<<<<<< HEAD
# COPY .next ./.next

=======
>>>>>>> 3c85fa4323220d6f67ba7869856e49b5c66dffc4
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]