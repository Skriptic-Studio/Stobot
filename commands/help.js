module.exports={
  name:'help',
  description: "Show commands",
  aliases: ['h','ajuda'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()

let m = await message.lineReply(embed.setTitle('**Help**').setDescription('Here you can see all commands of a given type\n\n**Send the type of command that you want:**\n1. Store commands\n2. Get commands\n3. Clear commands').setFooter('Answer 4 to cancel').setColor('#fdfd96'))

let filter = msg => msg.author.id == message.author.id;
const collector = message.channel.createMessageCollector(filter, { time: 15000 });
collector.on("collect", async msg => {
	if(msg.content == '1'){
		m.edit(embed.setTitle('**Store Commands**').setDescription("**s.store**\nStores user information.\n\n**s.storeserver**\nStores server information.\n\nIt's needed to give all arguments separated by '|'").setFooter('You can see more detais using s.help <command>').setColor('#fef24e'));
		msg.delete();
	} else if(msg.content == '2') {
		m.edit(embed.setTitle('**Get Commands**').setDescription('**s.get**\nGets user information.\n\n**s.getserver**\nGets server information.\n\nUse an information name as argument and get this specific information.').setFooter('You can see more detais using s.help <command>').setColor('#fef24e'));
		msg.delete();
	} else if(msg.content == '3') {
		m.edit(embed.setTitle('**Clear Commands**').setDescription("**s.clear**\n Clears all user information.\n\n**s.clear server**\n Clears all server information.").setFooter('You can see more detais using s.help <command>').setColor('#fef24e'));
		msg.delete()
	} else if(msg.content == '4') {
		m.edit(embed.setTitle('**Help** (Canceled)').setDescription('Here you can see all commands of a given type\n\n**~~Send the type of command that you want:~~**\n1. Store commands\n2. Get commands\n3. Clear commands').setFooter('Answer 4 to cancel'));
		msg.delete();
		collector.stop();
	}
})

	}
}