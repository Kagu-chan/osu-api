FROM node:10

RUN set -x \
	rm -rf /var/lib/apt/lists/*

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

ARG DISCORD_LOGIN_TOKEN
ARG DISCORD_LOGIN_RETRY_TIMEOUT
ARG DISCORD_LOGIN_RETRY_ATTEMPTS
ARG DISCORD_BOT_OWNER
ARG DISCORD_CHANNEL_REGEXP
ARG COMMAND_PREFIX
ARG API_KEY
ARG API_URL

RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./package.json /var/app
RUN npm install --production

COPY . .

RUN npm run build

# multi stage container - S1 build, S2 copy prod / i prod / dist run & args

CMD ["npm", "start", "-s"]
