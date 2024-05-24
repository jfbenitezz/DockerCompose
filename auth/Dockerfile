FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install express body-parser cors http-proxy-middleware

COPY server_auth.js .

CMD ["node", "auth.js"]
