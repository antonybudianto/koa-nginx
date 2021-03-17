FROM node:10-alpine

WORKDIR /usr/src/koa-nginx-app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
