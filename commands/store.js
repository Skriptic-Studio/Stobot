module.exports={
  name:'store',
  description: "Store information",
	aliases: ['set'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()
const userStorage = new Keyv(`sqlite://./databases/users.sqlite`);

let thumbnails = require("../config/thumbnail.json");

args = args.split('|');

if(!args[0]) return message.lineReply(embed.setTitle('Name argument missing').setDescription('<:wrong:856978795617583145> Please provide the **name** of the value you want.').setFooter('The correct usage would be s.store <name>|<description>|<detail>').setThumbnail(thumbnails.wrong).setColor("#ff0000"));
if(!args[1]) return message.lineReply(embed.setTitle('Description argument missing').setDescription('<:wrong:856978795617583145> Please provide the **description** of the value you want.').setFooter('The correct usage would be s.store <name>|<description>|<detail>').setThumbnail(thumbnails.wrong).setColor("#ff0000"));
if(!args[2]) return message.lineReply(embed.setTitle('Detail argument missing').setDescription('<:wrong:856978795617583145> Please provide the **detail** of the value you want.').setFooter('The correct usage would be s.store <name>|<description>|<detail>').setThumbnail(thumbnails.wrong).setColor("#ff0000"));

let userDb = await userStorage.get(`user - ${message.author.id}`);
if(!userDb) userDb = {};
userDb[args[0]] = [args[1], args[2]];
await userStorage.set(`user - ${message.author.id}`, userDb);

message.lineReply(embed.setTitle('Saved').setDescription("<:check:856978795394236428> Your data was sucessfully updated").setThumbnail(thumbnails.check).setColor("#00ff00"));
	}
}