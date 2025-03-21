FROM node:18-alpine as server-dependencies

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

WORKDIR /app

COPY server/package.json server/package-lock.json ./

RUN npm install -g npm@10 \
  && npm install -g pnpm \
  && pnpm import \
  && pnpm install --prod

FROM node:lts AS client

WORKDIR /app

COPY client/package.json client/package-lock.json ./

RUN npm install -g npm@10 \
  && npm install -g pnpm \
  && pnpm import \
  && pnpm install --prod

COPY client .
RUN DISABLE_ESLINT_PLUGIN=true npm run build

FROM node:18-alpine

RUN apk -U upgrade \
  && apk add bash \
  --no-cache

USER node
WORKDIR /app

COPY --chown=node:node start.sh .
COPY --chown=node:node server .
COPY --chown=node:node healthcheck.js .

RUN mv .env.sample .env

COPY --from=server-dependencies --chown=node:node /app/node_modules node_modules

COPY --from=client --chown=node:node /app/build public
COPY --from=client --chown=node:node /app/build/index.html views/index.ejs

VOLUME /app/public/user-avatars
VOLUME /app/public/project-background-images
VOLUME /app/private/attachments

EXPOSE 1337

HEALTHCHECK --interval=10s --timeout=2s --start-period=15s \
  CMD node ./healthcheck.js


CMD [ "bash", "start.sh" ]
