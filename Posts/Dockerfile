FROM node:9.3.0-slim

WORKDIR /app

ADD package.json /app/package.json
RUN npm install 

ADD . /app

EXPOSE 3003

CMD ["node", "server.js"]
