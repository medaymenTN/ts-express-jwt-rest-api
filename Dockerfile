# ---------- Base ----------
FROM node:lts-buster-slim as base

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app 

WORKDIR /home/node/app

# ---------- Build ----------
FROM base as build

COPY --chown=node:node package*.json ./

USER node

RUN npm install --only=production && npm cache clean --force --loglevel=error

RUN npm install typescript apidoc 

COPY --chown=node:node . .

RUN npm run build 

# ---------- Release ----------
FROM build AS release

COPY --from=build --chown=node:node  /home/node/app/ .

COPY ormconfig.docker.json ./ormconfig.json

USER node

RUN npm run docs:generate

EXPOSE 5000

CMD ["npm","run","start:prod"]

