
FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install express body-parser cors
COPY notes.js .
COPY index.html .
COPY styles.css .  
EXPOSE 3001
CMD ["node", "notes.js"]


