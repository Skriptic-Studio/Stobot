module.exports={
  name:'storeserver',
  description: "Store information",
	aliases: ['stores', 'sets', 'setserver'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()
const serverStorage = new Keyv(`sqlite://./databases/servers.sqlite`);

let thumbnails = require("../config/thumbnail.json");

args = args.split('|');

if(!args[0]) return message.lineReply(embed.setTitle('Name argument missing').setDescription('<:wrong:856978795617583145> Please provide the **name** of the value you want.').setFooter('The correct usage would be s.store <name>|<description>|<detail>').setThumbnail(thumbnails.wrong).setColor("#ff0000"));
if(!args[1]) return message.lineReply(embed.setTitle('Description argument missing').setDescription('<:wrong:856978795617583145> Please provide the **description** of the value you want.').setFooter('The correct usage would be s.store <name>|<description>|<detail>').setThumbnail(thumbnails.wrong).setColor("#ff0000"));
if(!args[2]) return message.lineReply(embed.setTitle('Detail argument missing').setDescription('<:wrong:856978795617583145> Please provide the **detail** of the value you want.').setFooter('The correct usage would be s.store <name>|<description>|<detail>').setThumbnail(thumbnails.wrong).setColor("#ff0000"));

let serverDb = await serverStorage.get(`server - ${message.guild.id}`);
if(!serverDb) serverDb = {};
serverDb[args[0]] = [args[1], args[2]];
await serverStorage.set(`server - ${message.guild.id}`, serverDb);

message.lineReply(embed.setTitle('Saved').setDescription("Server data was sucessfully updated").setThumbnail(thumbnails.check).setColor("#00ff00"));

	}
}