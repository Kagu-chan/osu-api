FROM node:10

RUN mkdir -p /install

WORKDIR /install

COPY ./package.json /install
COPY ./RELEASE.json /install
COPY ./tsconfig.json /install
COPY ./src /install/src
COPY ./locales /install/locales

RUN npm i
RUN npm run build

FROM node:10

RUN set -x \
	rm -rf /var/lib/apt/lists/*

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

ARG DISCORD_LOGIN_TOKEN
ARG DISCORD_LOGIN_RETRY_TIMEOUT
ARG DISCORD_LOGIN_RETRY_ATTEMPTS
ARG DISCORD_BOT_OWNER
ARG DISCORD_BOT_ADMINISTRATORS
ARG DISCORD_CHANNEL_REGEXP
ARG COMMAND_PREFIX
ARG API_KEY
ARG API_URL

RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./package.json .
RUN npm install --production

COPY --from=0 /install/dist dist

CMD ["npm", "start", "-s"]
