# Dockerfile

FROM node:16 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "pm2"]