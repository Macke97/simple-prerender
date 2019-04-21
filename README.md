# Simple-Prerender

This is a simple prerender server using Node.js and the [Prerender.io server](https://github.com/prerender/prerender) (big shoutout to them!).

This app works best when running through Docker.

## Available options
### These are set via ENV variables.
| Key   | Description                                                                                            |
|-------|--------------------------------------------------------------------------------------------------------|
| PORT  | `Number` Which port the server should be ran on.                                                       |
| CACHE | `Boolean` Whether to use in-memory caching for faster responses when multiple requests hit the server. |
| DEBUG | `Boolean` Set to true if running the app outside Docker.                                               |
## Docker
Example on running with Docker: 
```sh
docker run -p 9000:9000 macke1997/simple-prerender:latest
```

## Docker compose

Example:
```yml
version: "3"
services: 
  prerender:
    image: macke1997/simple-prerender:latest
    ports:
      - 9000:9000
    environment: 
      CACHE: "true"
```

## Test it
Make a GET request to the server and append `/render?url=YOUR_URL` and hopefully you'll see the page of the URL you provided.

# NOTE!
Note that the assets doesn't load properly, that's because the request is not proxied and therefor the prerender server is acting like the host, which it's obviously not. To get around easily, [prerender.io](https://prerender.io/documentation/install-middleware) has put together middlewares for a lot of different technologies. **Just be sure to configure the middlewares to point to your prerender server and not their own service.**

With Express.js you can e.g use [this](https://github.com/prerender/prerender-node) and add to your app:
```js
app.use(require('prerender-node').set('prerenderServiceUrl', '<URL pointing to your prerender server>'));
```

# Why?
Single page applications (SPAs) are super nice today. But they lack one "feature" - SEO. A lot of web crawlers have problem with rendering JavaScript rendered content on SPA websites. One popular solution is to create a server rendered infrastructure, but that can sometimes be confusing and time consuming. 

# How does this solve it?
This app uses [prerender.io's](https://preprender.io) prerender server with some abilities to set options, and it's also Dockerized of course  🤓

The strategy with prerendering is to only listen on web crawler request and use e.g an headless browser to render the page (including JS rendered content) and serve it back to the crawler, no server-side rendering required! 

