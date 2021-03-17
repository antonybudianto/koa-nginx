const server = require("./server");

const PORT = process.env.PORT || 3000;
console.log("server running at " + PORT);
server.listen(PORT);
