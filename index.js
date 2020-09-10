// -| Bot Organizado |- //

const Discord = require('discord.js');
const bot = new Discord.Client();

const path = require("path")

const fs = require("fs").promises;

bot.comandos = new Discord.Collection();
bot.config = require('./config.js');

// -| Comandos |- //

(async function handleCommands(dir = "comandos") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleCommands(path.join(dir, file));
      } else {
          if (file.endsWith(".js")) {
              let name = file.slice(0, file.length - 3);
              let properties = require(path.join(__dirname, dir, file));
                bot.comandos.set(name, properties);
          }
      }

  }
})();

// -| Eventos |- //

(async function handleEvents(dir = "eventos") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleEvents(path.join(dir, file));
      } else {
          if (!file.endsWith(".js")) return;
          
          let event = require(path.join(__dirname, dir, file));
          event.run(bot);
      }


  }
})();

// -| Evento Ready |- //


bot.on("ready", async () => {
  
  console.log(`Estoy listo!`);

bot.user.setActivity(`Bot Plantilla`, { url: null, type: "WATCHING" });
    
})

// -| Login |- //

bot.login(bot.config.token)