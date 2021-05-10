const Koa = require("koa");
const os = require("os");

const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === "/favicon.ico") {
    ctx.status = 404;
    return;
  }

  ctx.response.type = "text/html";
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Hello Koa</h1>
      </body>
    </html>
  `;
});

module.exports = app;
