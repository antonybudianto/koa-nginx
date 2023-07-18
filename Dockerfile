FROM node:18-alpine

WORKDIR /usr/data/koa-app

COPY package.json yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["node", "index.js"]
