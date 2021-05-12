
<div align="center">
<h1> FurDevs Discord Bot</h1>
<img alt="FurDevs-Logo" src="https://www.furdevs.com/images/picture.png" />
  <br>
<img alt="Discord" src="https://img.shields.io/discord/731520035717251142?color=%238800FF&label=Discord%20Server"> <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/Fur_Devs?label=Follow%20FurDevs%21&logoColor=%238800ff&style=social">
</div>

## About

FurDevs Discord Bot is a Multipurpose Discord Bot  for the [FurDevs Discord Server](https://discord.gg/JABY6Htnqt)

## Quick Start

This section is for you if you're already familiar with discord bots in general.

To use the FurDevs Discord Bot on your server, you'll need:

- Git, NPM or Yarn, and Node.js
- A Discord account
- MongoDB Account, and a database for FurDevs
- An application for the bot (Make this in the [Discord Developer Portal](https://discord.com/developers/applications))
- Common Sense ( Don't leak the bot token )

Once you have all the dependencies:

1. `git clone https://github.com/Discord-FurDevs/FurDevs-Bot.git`
2. Run `npm install`.
3. You'll find a `.env.example`, Rename it to `.env` then add all of the neccessary information.
4. Start the bot by doing `node .`.

## Verbose Installation Guide

If you're not terribly familiar with discord bot development, then this section may be for you. It has a little more detail than the above section, and focuses on getting things working in Windows 10.

Of course, if you'd like help, head on over to the FurDevs Discord server. :)

### Overview

Discord bots are programs that run on internet connected computers. They talk to the Discord API to do things like send messages in a Discord server.

To add the FurDevs Discord Bot to a server, you'll have to:

1. Have a Discord account.
2. Have a Discord server you want to add it to. (You have to have the proper permissions to do this. If you're just testing out the bot, then you should probably make an empty one for testing purposes.)
3. Have a copy of the FurDevs Discord Bot running on your computer.

### FurDevs Discord Bot Prerequisites

To run the FurDevs Discord Bot on your computer, you'll need to install the following if they're not on your Windows 10 system already. Some have lots of options in the installation process - just accept all the defaults and click next until the installation is complete and you should be fine.

- [Git](https://git-scm.com/download/win)
- [Node.js](https://nodejs.org/en/download/current/)
- [MongoDB Community](https://www.mongodb.com/try/download/community)

#### MongoDB Community Installation Notes

When you install MongoDB Community with the defaults, a MongoDB service is installed on your Windows 10 installation. When you're done using MongoDB for this bot (or other purposes) it makes sense to disable it. To do that, type "services.msc" in the start menu, press enter, scroll down to and click "MongoDB Server", click the "Stop" button, then change the "Startup type" to "Disabled".

You'll also install MongoDB Compass. This is just a tool for looking at what's stored in your instance of MongoDB. You don't have to use this to run the FurDevs Discord Bot, but it's nice to have around in case you want to see what's stored in the database. All you have to do to use it is connect to the database by putting the following in the connect box and the pressing the connect button:
`mongodb://127.0.0.1:27017`

### Getting a copy of the bot

Now that you have the prerequisites installed, let's get a copy of the bot.

In a folder that you'd like the bot to be stored in, right click and select the "Git Bash Here" option. Then run the following: (leave it open, we'll use it for subsequent steps)
`git clone https://github.com/Discord-FurDevs/FurDevs-Bot.git`

You should see that a new folder was created falled "FurDevs-Bot". Now we enter that folder like this:
`cd FurDevs-Bot`

### Configuring the bot

Before we can run the bot, we have to configure it.

The first part of that is installing the bot's JavaScript dependencies. In the same "Git Bash" window you left open from before, run the following:

`cd FurDevs-Bot`
`npm install`

After a few seconds, the dependencies should be installed.

Once that's done, we can configure the bot's `.env` file.

The `.env` file contains three settings that are specific to everybody's individual running copy of the bot, so we have to configure them each time we create a new instance of the bot.

    TOKEN=
    DB=
    DICTIONARYAPI=

There's an example file that includes the above that you can fill out to be your `.env` file. Just run:

`cp .env.example .env`

Then open the `.env` file in notepad with:

`notepad .env`

#### TOKEN

The TOKEN is the identifier that we get from Discord to identify our instance of the bot. With it, Discord can differentiate between different instances of the same bot. We have to get one generated to use for our instance. We also have to be careful to protect it, as sharing it would allow others to impersonate our bot. (If you've ever used another API before, it's basically your "API Key")

To generate an Application Token (as they're technically called) we have to log into the [Discord Developer Portal](https://discord.com/developers/applications) and perform the following steps:

1. Click the "New Application" button in the top right of the page.
2. Give the application a name. "FurDevs Bot" makes sense here, but you can call it whatever you'd like.
3. Go to the "Bot" section in the menu on the left hand side of the page.
4. Click the "Add Bot" on the right hand side of the page.
5. Confirm that you'd like to add the bot.
6. Underneath the Bot's username and to the right of the Bot's icon is a link that says "Click to Reveal Token". Click it and copy it into your `.env` file after `TOKEN=`!

Once your token's created, we should give it some permissions while were in the right page of the Discord Developer Portal

1. Go to the "OAuth2" section in the menu on the left hand side of the page.
2. Check the "Bot" box in the middle column of boxes to check.
3. In the checkboxes that appear below, check the "Administrator" box under the "General Permissions" column. (Warning: This is fine for a test server, but you should read about Discord Bot permissions before checking the Administrator box for a bot that has actual users.)
4. Copy the URL generated under the first group of checkboxes.
5. Paste the URL into your browser.
6. Select the server you want to add the bot to.
7. Click "Continue" then "Authorize".

You're done configuring the token!

#### DB

The DB tells the bot where it can find a MongoDB database that it can use to store its data.

This one is easy to configure - you just have to tell the bot to use your local instance of MongoDB by using the following value:

`mongodb://127.0.0.1:27017`

#### DICTIONARYAPI

The DICTIONARYAPI setting is for a Merriam-Webster Dictionary API key. With it, the FurDevs discord bot can look up words in the Merriam-Webster dictionary. This is optional, so for now, we'll skip it. However, if you want to get an API key, you can do that here: https://dictionaryapi.com/

### Running the bot

Once your `.env` file is configured, save and close it, the return to your Git Bash window and run the following to start the bot:
`node .`

Also, it might be scary at first if you see a bunch of text flood down your terminal! Don't worry, this is completely normal. It's the bot's debugging output telling you what is happening.

That's it! You're done! Play around with the bot by using it's commands in your server; `>help` and `>furryirl`, for example!
