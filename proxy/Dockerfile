FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install http-proxy-middleware

COPY proxy.js .

EXPOSE 4000

CMD ["node", "proxy.js"]
