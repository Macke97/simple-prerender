const prerender = require('prerender');
const server = prerender({
    port: process.env.PORT || 9000,
    chromeLocation: process.env.CHROME_LOCATION || null,
    chromeFlags: !process.env.DEBUG && ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars']
});
process.env.CACHE && server.use(require('prerender-memory-cache'));
process.env.CACHE && console.log('Using cache. Remember! This is an in-memory-cache.')
console.log('Chromium location:', process.env.CHROME_LOCATION)
server.start();
