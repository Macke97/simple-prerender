const prerender = require('prerender');
const server = prerender({ port: process.env.PORT || 9000 });
process.env.CACHE && server.use(require('prerender-memory-cache'));
server.start();
