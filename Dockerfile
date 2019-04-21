FROM node:10


USER root
RUN mkdir /usr/app
WORKDIR /usr/app
ADD . /usr/app

# ---- Chromium stuff
RUN apt-get update
RUN apt-get install -y chromium

# ---- Node server stuff
RUN yarn

ENV CHROME_LOCATION=/usr/bin/chromium

ENTRYPOINT [ "yarn", "start" ]