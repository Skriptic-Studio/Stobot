module.exports={
  name:'getserver',
  description: "Gets information",
  aliases: ['lists', 'shows', 'gets', 'listserver', 'showserver'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()
const serverStorage = new Keyv(`sqlite://./databases/servers.sqlite`);

let serverDb = await serverStorage.get(`server - ${message.guild.id}`);
if(!serverDb) serverDb = {};

let description = "";

if(!args) {
	for (let info of Object.keys(serverDb)){
		description += `**- ${info}:\n**${serverDb[info][0]}\n`
	}
	return message.lineReply(embed.setTitle('**Server Informations:**').setDescription(description).setColor('#0000ff').setThumbnail("https://cdn.discordapp.com/attachments/856971631515926559/856980785668423710/1f5c3.png"))
}

if(!serverDb[args]) return message.lineReply('Server dont own that information.');

message.lineReply(embed.setTitle(`**${args}**`).setDescription(`**Description:** ${serverDb[args][0]}\n**Details:** ${serverDb[args][1]}`).setColor('#0000ff').setThumbnail("https://cdn.discordapp.com/attachments/856971631515926559/856980823684415528/open-file-folder_1f4c2.png"));

	}
}