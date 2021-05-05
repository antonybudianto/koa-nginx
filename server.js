const Koa = require("koa");
const os = require("os");

const formatMemoryUsage = (data) =>
  `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

const formatMemoryUsageInt = (data) =>
  Math.round((data / 1024 / 1024) * 100) / 100;

const logCurrentMemory = (info) => {
  const memoryData = process.memoryUsage();
  const memoryUsage = {
    rssInt: formatMemoryUsageInt(memoryData.rss),
    heapTotalInt: formatMemoryUsageInt(memoryData.heapTotal),
    heapUsedInt: formatMemoryUsageInt(memoryData.heapUsed),
    // rss: `${formatMemoryUsage(
    //   memoryData.rss
    // )} -> Resident Set Size - total memory allocated for the process execution`,
    // heapTotal: `${formatMemoryUsage(
    //   memoryData.heapTotal
    // )} -> total size of the allocated heap`,
    // heapUsed: `${formatMemoryUsage(
    //   memoryData.heapUsed
    // )} -> actual memory used during the execution`,
    // external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
  };
  return memoryUsage;
};

const app = new Koa();
let data = [];
const LIMIT = 2000;
let count = 0;
const labels = [];
for (let i = 0; i < LIMIT; i++) {
  labels.push(i);
}

app.use(async (ctx) => {
  if (ctx.url === "/favicon.ico") {
    ctx.status = 404;
    return;
  }
  // count++;
  if (data.length > 0 && data.length % LIMIT === 0) {
    console.log("clear!", data.length, count);
    data.shift();
  }
  const log = logCurrentMemory("");
  data.push({
    rss: log.rssInt,
    heapTotal: log.heapTotalInt,
    heapUsed: log.heapUsedInt,
  });

  ctx.response.type = "text/html";
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <body>
        <div style="width:800px; height: 400px;">
        <canvas id="myChart"></canvas>
        </div>

        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script type="text/javascript">
        const labels = JSON.parse("${JSON.stringify(labels)}");
        const data = {
          labels: labels,
          datasets: [
            {
            label: 'rss',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: JSON.parse("${JSON.stringify(data.map((d) => d.rss))}"),
           },
          //  {
          //   label: 'heapTotal',
          //   backgroundColor: 'green',
          //   borderColor: 'lightgreen',
          //   data: JSON.parse("${JSON.stringify(
            data.map((d) => d.heapTotal)
          )}"),
          //  },
          //  {
          //   label: 'heapUsed',
          //   backgroundColor: 'blue',
          //   borderColor: 'lightblue',
          //   data: JSON.parse("${JSON.stringify(
            data.map((d) => d.heapUsed)
          )}"),
          //  },
        ]
        };

        const config = {
          type: 'line',
          data,
          options: {}
        };
        var myChart = new Chart(
          document.getElementById('myChart'),
          config
        );

        for(let i=0;i<1000;i++) {
          fetch('http://localhost:3000').then()
        }
        setTimeout(() => {
          window.location.reload()
        }, 5000)
        </script>
      </body>
    </html>
  `;
});

module.exports = app;
