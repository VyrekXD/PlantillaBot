const Discord = require('discord.js')

module.exports.run = bot => {
    bot.on("message", async message => {
  
        const prefix = bot.config.prefix

        if(message.author.bot) return;
        
        if(!message.content.startsWith(prefix)) return; 
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);  
        const command = args.shift().toLowerCase()
  
        let cmd = bot.comandos.get(command) || bot.comandos.find(c => c.aliases && c.aliases.includes(command))
        if(cmd)cmd.run(bot,message,args)
        
   
    });
  }