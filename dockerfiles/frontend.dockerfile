FROM node:alpine

COPY /frontend /frontend
WORKDIR /frontend
RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
