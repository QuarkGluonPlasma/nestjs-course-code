FROM node:18-alpine3.14

WORKDIR /app

COPY ./index.js .

RUN npm install -g pm2

CMD ["pm2-runtime", "/app/index.js"]
