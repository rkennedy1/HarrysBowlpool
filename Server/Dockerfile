# Dockerfile

FROM node:lts as base

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

FROM base as production

ENV NODE_PATH=./build

EXPOSE 1313

RUN yarn build

CMD ["yarn", "start"]