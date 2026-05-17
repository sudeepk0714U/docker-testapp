FROM node

ENV MONGO_DB_USERNAME=admin \
    MONDO_DB_PWD=qwerty

WORKDIR /testapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["node", "server.js"]