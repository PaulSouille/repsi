FROM node:10-alpine AS build

RUN apk update && apk add git

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# -----------------

FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

COPY --from=build ./app/dist/repsi .

RUN npm install -g live-server

ENV NODE_ENV=production

EXPOSE 80

CMD ["live-server", "--port=80", "--host=0.0.0.0", "--no-browser", "--entry-file=index.html"]