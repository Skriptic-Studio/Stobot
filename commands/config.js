module.exports={
  name:'config',
  description: "Changes configs",
  aliases: ['configs'],
  async execute(message, args, client){

const Discord = require("discord.js")
const Keyv = require('keyv');
require("discord-reply")
const embed = new Discord.MessageEmbed()
const userStorage = new Keyv(`sqlite://./databases/users.sqlite`);
const serverStorage = new Keyv(`sqlite://./databases/servers.sqlite`);


	
	}
}