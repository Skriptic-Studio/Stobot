module.exports={
  name:'get',
  description: "Gets information",
  aliases: ['list','show'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()
const userStorage = new Keyv(`sqlite://./databases/users.sqlite`);

let userDb = await userStorage.get(`user - ${message.author.id}`);
if(!userDb) userDb = {};

let description = "";

if(!args) {
	for (let info of Object.keys(userDb)){
		description += `**- ${info}:\n**${userDb[info][0]}\n\n`
	}
	return message.lineReply(embed.setTitle('**Informations:**').setDescription(description).setThumbnail("https://cdn.discordapp.com/attachments/856971631515926559/856980785668423710/1f5c3.png"));
}

if(!userDb[args]) return message.lineReply('You dont own that information.');

message.lineReply(embed.setTitle(`**${args}**`).setDescription(`**Description:** ${userDb[args][0]}\n**Details:** ${userDb[args][1]}`).setColor('#0000ff').setThumbnail("https://cdn.discordapp.com/attachments/856971631515926559/856980823684415528/open-file-folder_1f4c2.png"));

	}
}