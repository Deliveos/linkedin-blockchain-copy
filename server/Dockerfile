FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "node", "server.js" ]