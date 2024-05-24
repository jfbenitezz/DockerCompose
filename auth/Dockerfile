FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install express body-parser cors
COPY auth.js .
COPY index.html . 
COPY styles.css .  
EXPOSE 3000
CMD ["node", "auth.js"]