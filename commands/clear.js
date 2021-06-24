module.exports={
  name:'clear',
  description: "Clear database",
  aliases: [],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()
const userStorage = new Keyv(`sqlite://./databases/users.sqlite`);
const serverStorage = new Keyv(`sqlite://./databases/servers.sqlite`);
let thumbnails = require('../config/thumbnail.json')
if(!args) {
	message.lineReply(embed.setTitle("**Are you sure?**").setDescription("This command without arguments deletes all your storage.").setFooter("Answer with 'yes'|'y', or 'no'|'n'."))
	
	let filter = msg => msg.author.id == message.author.id && (msg.content == 'y'||msg.content == 'yes'||msg.content == 'n'||msg.content == 'no');
	const collector = message.channel.createMessageCollector(filter, { time: 15000 });
	collector.on("collect", async msg => {
		if(msg.content == 'y'||msg.content == 'yes'){
			await userStorage.delete(`user - ${msg.author.id}`);
			message.lineReply("All your storage was succesfully cleared");
		} else {
			return message.lineReply("Proccess Cancelled")
		}
		collector.stop()
	})
}
if(args=="all") {
	if(message.author.id=="639599540512620544" || message.author.id=="460429419404853248") {
		message.lineReply(embed.setTitle("**Are you sure?**").setDescription("This command will delete all users storage.").setFooter("Answer with 'yes'|'y', or 'no'|'n'."))

		let filter = msg => msg.author.id == message.author.id && (msg.content == 'y'||msg.content == 'yes'||msg.content == 'n'||msg.content == 'no');
		const collector = message.channel.createMessageCollector(filter, { time: 15000 });
		collector.on("collect", async msg => {
			if(msg.content == 'y'||msg.content == 'yes'){
				await userStorage.clear().then(()=>{
				message.lineReply(embed.setTitle("**Deleted**").setDescription("You deleted all users database dev, no regrets now.").setFooter("I hope it was because you wanted to."));
			})
			} else {
				return message.lineReply("Proccess Cancelled")
			}
			collector.stop()
		})

		
	}
	else {
		return;
	}
}
if(args=="server" || args=="s") {
	if(message.member.hasPermission('ADMINISTRATOR')) {
		message.lineReply(embed.setTitle("**Are you sure?**").setDescription("This command without arguments deletes all server storage.").setFooter("Answer with 'yes'|'y', or 'no'|'n'."))
	
		let filter = msg => msg.author.id == message.author.id && (msg.content == 'y'||msg.content == 'yes'||msg.content == 'no'||msg.content == 'no');
		const collector = message.channel.createMessageCollector(filter, { time: 15000 });
		collector.on("collect", async msg => {
			if(msg.content == 'y'||msg.content == 'yes'){
				await serverStorage.delete(`server - ${msg.guild.id}`);
				return message.lineReply("All server storage was succesfully cleared");
			} else {
				return message.lineReply("Proccess Cancelled")
			}
		})
	}
	else {
		message.lineReply(embed.setTitle("**Failed**").setDescription("You are not an administrator on this server.").setThumbnail(thumbnails.wrong).setColor("#ff0000"));
		return;
	}
	
}
	
	}
}