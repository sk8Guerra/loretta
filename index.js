require('dotenv').config();
const http = require('http');
const express = require('express');

const { initialize } = require('./src/discord');
const Bot = require('./src/bot/bot');
const events = require('./src/bot/events');
const { THIRTY_MINUTES_IN_MILLISECONDS } = require('./src/constants');

const app = express();
const server = http.createServer(app);
app.get('/', (_, response) => response.send('Hello World!'));

const setSelfCalling = () => {
  setInterval(() => http.get(process.env.DEPLOY_ENDPOINT), THIRTY_MINUTES_IN_MILLISECONDS);
};

server.listen(process.env.PORT, () => {
  console.log('Server running. 🚀');
  setSelfCalling();
  const client = initialize();
  new Bot(client).createEvents(events);
});
