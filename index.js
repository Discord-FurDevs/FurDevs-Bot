const { Client, Collection, Structures } = require("discord.js");
const chalk = require("chalk");
const { readdirSync } = require("fs");
require("dotenv").config();
require("./structures/Guild");
require("./structures/User");
require("./structures/GuildMember");
const enmap = require('enmap')
const client = new Client({ disableMentions: "everyone" });
const { load } = require("./utils/utils");
const enmap = require('enmap');
client.commands = new Collection();
client.aliases = new Collection();

// Console Chalk
client.fdevsLog = `${chalk.cyanBright("[FurDevs - Log]")}`;
client.fdevsError = `${chalk.redBright("[FurDevs - Error]")}`;
client.fwebsLog = `${chalk.greenBright("[FurDevs Web - Log]")}`;
client.bumpEnmap = new enmap({name: "enmap"});

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`${client.fdevsLog} Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(`${client.fdevsError} WHOOPS! We ranned into an Database Error\n\n${err}`); 
  });

const init = async () => {
  console.stdlog = console.log.bind(console);
  console.logs = [];
  console.log = function(){
    console.logs.push(Array.from(arguments) + "\n");
    if (console.logs.length > 10) {
      for (i = 0; i != 3; i++) {
        console.logs.shift()
      }
    }
    console.stdlog.apply(console, arguments);
  }
  console.log(String.raw` _____           ____                  `);
  console.log(String.raw`|  ___|   _ _ __|  _ \  _____   _____  `);
  console.log(String.raw`| |_ | | | | '__| | | |/ _ \ \ / / __| `);
  console.log(String.raw`|  _|| |_| | |  | |_| |  __/\ V /\__ \ `);
  console.log(String.raw`|_|   \__,_|_|  |____/ \___| \_/ |___/ `);
  console.log(String.raw`====================================== `);
  const cmds = [];
  readdirSync("./commands/").forEach((dir) => {
    var cmdFiles = readdirSync(`./commands/${dir}/`);
    console.log(
      `${client.fdevsLog} Loading ${dir} Module Which Contains ${cmdFiles.length} commands.`
    );
    cmdFiles.forEach((cmd) => {
      if (!cmd.endsWith(".js")) return;
      const response = load(client, dir, cmd);
      cmds.push(cmd);
      if (response) console.log(response);
    });
  });
  console.log("==================================");
  console.log(`${client.fdevsLog} Loaded a total ${cmds.length} Commands!`);

  const evtFiles = await readdirSync("./events/");
  console.log(
    `${client.fdevsLog} Loading a total of ${evtFiles.length} events.`
  );
  evtFiles.forEach((evt) => {
    const eventName = evt.split(".")[0];
    const event = require(`./events/${evt}`);
    client.on(eventName, event.bind(null, client));
  });

  // Create Probability array for Coin drop
  const settings = require("./settings.json");
  let probabilityArray = [];
  for (let key in settings.coinDropProbability) {
    for (let i = 0; i < settings.coinDropProbability[key]; i++) {
      probabilityArray.push(Number(key));
    }
  }
  client.coinDropArray = probabilityArray;

  client.login(process.env.TOKEN);
};

init();
