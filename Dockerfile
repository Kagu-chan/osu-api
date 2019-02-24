FROM node:8

RUN set -x \
	rm -rf /var/lib/apt/lists/*

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

ARG BOT_TOKEN
ARG BOT_CHANNEL_REGEX
ARG BOT_COMMAND_PREFIX
ARG BOT_NAME
ARG BOT_OWNER
ARG API_KEY
ARG API_URL

RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./package.json /var/app
RUN npm install --production

COPY . .

CMD ["npm", "start", "-s"]
