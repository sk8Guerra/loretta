const Discord = require("discord.js");
const client = new Discord.Client();

const initialize = () => {
  client.login(process.env.TOKEN);

  client.on("ready", () => {
    console.log("I'm loretta, I just woke up.");
    client.channels.get(process.env.CHANNEL_ID).send(process.env.INIT_MESSAGE);
  });

  return client;
};

module.exports = { initialize };
