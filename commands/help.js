module.exports={
  name:'help',
  description: "Show commands",
  aliases: ['h','ajuda'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()

message.lineReply(embed.setTitle('***Help***').setDescription('Here you can see all commands of a given type\n\n**Press the type of command that you want:**\n1. Store commands\n2. Get commands\n3. Clear commands').setFooter('Answer 4 to cancel'))

let filter = msg => msg.author.id == message.author.id && (msg.content == '1'||msg.content == '2'||msg.content == '3');
const collector = message.channel.createMessageCollector(filter, { time: 15000 });
collector.on("collect", async msg => {
	if(msg.content == '1'){
		return message.lineReply(embed.setTitle('***Get Commands***').setDescription('**s.get**\nGets user information.\n\n**s.getserver**\nGets server information.\n\nUse a information name as argument and get this specific information.'));
	} else if(msg.content == '2') {
		return message.lineReply(embed.setTitle('***Store Commands***').setDescription("**s.store <name>|<description>|<detail>**\nStores user information.\n\n**s.storeserver <name>|<description>|<detail>**\nStores server information.\n\nIts needed to give all arguments separated by '|'"));
	} else if(msg.content == '3') {
		return message.lineReply(embed.setTitle('***Clear Commands***').setDescription("**s.clear**\n Clears all user information.\n\n**s.clear server**\n Clears all server information."));
	} else if(msg.content == '4') {
		return message.lineReply('Canceled');
	}
})

	}
}