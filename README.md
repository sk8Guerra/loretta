# Loretta
I've built this tiny bot to a friend. But use it, if you need it. 😃

Basically it sends messages to a specific channel in [Discord](https://discord.com/). It uses `setInterval(() => {}, 100);` function to set timers that will send the messages. After the message was sent, the timer is removed and set again to keep sending messages over and over again.

I suggest you to deploy your bot to the cloud, because if you turn off your computer, the bot will be turned off too.

You will notice that `express` is installed. It is used to make requests every 3 mins to itself to keep it alive, so any platform where you decide to deploy it will suspend the bot. That's why you have to add the url where your bot was deployed to `DEPLOY_URL` that is in `.env` file. I deployed it on heroku.



## 📦 Install

#### Discord

##### Create a bot

* Go to [Discord](https://discord.com/)
- If you don't have an account, create it here 👉🏽 [Register](https://discord.com/register). If you do, just login.
- Go to [Discord's developer page](https://discord.com/developers/applications/).
- Click on **Applications tab**, and then hit **New Application** button.
- Give your application a name and then click on **Create** button.
- You will be redirected to your app's settings. Go to **Bot** tab and click **Add Bot**.
- A message will show asking if really want to create a bot, click **Yes, do it!** to continue.
- A message saying **A wild bot has appeared!** will be shown, otherwise choose a different name to your app (becuase it will be used to automatically name your bot).
- Down the username, there is a **TOKEN** section, this will be used in later `node.js`.


##### Add it to a server

- Go to the main page of Discord and click on **+** icon of your servers list.
- A popup will show up, click on **Create a server**.
- Give your server a name and click on **Create**. Now we have to add our bot to our server.
- Go back to [Discord's developer page](https://discord.com/developers/applications/) and click on **OAuth2** tab.
- In the **Scopes** section, check **bot** option.
- Down **Scopes** section, is the **Bot Permissions** section. Select **Administrator**.
- Then click **copy** button that is in **Scopes** section.
- Open a new tab and paste in the URL you've just copied, select your server and click on **Authorize**, and if there is a captcha just complete it.

Now go to the main page of Discord. You will notice that you bot was added.

>NOTE: There is a risk that Discord won't let your bot send messages to the channel, if it doesn't has admin pesmissions.

#### Service

- Clone this repo to your local machine.
- Change the name of `.env_sample` to `.env`.
- Rember the token that I talked to you before? Add it on `TOKEN` in `.env` file.
- Then copy the last string of numbers that are in your channel's URL and paste it on `CHANNEL_ID` also in the `.env` file.
- Also in `.env` file specify the `PORT` your bot will be running on.
- Then specify your messages in the `events.js` file. It's an array of objects that has `hours`, `minutes` and `message` as properties.

## 🛠 Usage

- Run `npm install`. This will only install 3 packages.
- Finally `node bot.js` or `npm run start`

You should see something like this:

![GitHub Logo](/botrun.png)

And that's it! 🥳 This bot will be sending message to your channel.

> NOTE: As I told you at the beginning, I suggest you to deploy it to somewhere in the cloud, so it will be always running and sending messages. But if you want to keep your computer on, it's ok.

## 🙌🏽 Contribute

We can take this bot even further!

## 🐛 Reporte a problem

Rise an issue or make a pull request.









