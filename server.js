const Koa = require("koa");
const os = require("os");

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "hello! " + ctx.request.querystring;
});

module.exports = app;
