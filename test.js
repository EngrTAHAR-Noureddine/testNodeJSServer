const http = require('http');

const routes = require('./routes'); //get export from routes.js and don't write "".js"

console.log(routes.someText);

const server = http.createServer(routes.handler); 

server.listen(3001);