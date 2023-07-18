const Koa = require("koa");

const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === "/favicon.ico") {
    ctx.status = 404;
    return;
  }

  const HOST = ctx.get("Host");

  console.log("req>", ctx.path, ctx.querystring, "host:", ctx.get("Host"));
  ctx.response.type = "text/html";
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Hello Koa ${HOST}</h1>

        ${
          HOST === "dev1.qontak.local"
            ? `<iframe src="http://dev2.qontak.local:8000/">`
            : "Dev2"
        }
        
      </body>
    </html>
  `;
});

module.exports = app;
