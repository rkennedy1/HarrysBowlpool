# Dockerfile

#Stage 1
FROM node:19 as baseweb

WORKDIR /home/node/app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

# Stage 2
FROM nginx:stable

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=baseweb /home/node/app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]