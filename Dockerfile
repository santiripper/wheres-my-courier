FROM node:10

ENV HOME=/app
RUN mkdir /app

COPY package*.json $HOME/

WORKDIR $HOME

RUN npm install

COPY . .
COPY .env.docker $HOME/.env

RUN npx adonis migration:run
RUN npx adonis seed

CMD ["npx", "adonis", "serve"]
