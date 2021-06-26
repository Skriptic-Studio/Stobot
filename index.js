const Discord = require('discord.js');
//const keep_alive = require('./web/keep_alive.js');
const fs = require('fs');
const ms = require('ms');
const Keyv = require('keyv');
require("discord-reply")
require("./web.js");
const prefix = "s.";
const client = new Discord.Client({ disableMentions: 'everyone' });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {ownerID} = require('./config/config.json')
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("error", (e) => console.error(e));

client.once('ready', () => {
	console.log('Ready');
	client.user.setActivity("my storage informations", { type: "WATCHING" });
});

client.on('message', async message => {
	/*if (message.mentions.has(client.user.id)) {
		const embed = new Discord.MessageEmbed()
			.setTitle("You pinged me!")
			.setDescription("My prefix is " + prefix)
			.setColor("#0000ff");
		return message.channel.send(embed).catch(function() { })
	};*/
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

	let args = message.content.slice(prefix.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();
	args = args.join(' ');

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm')	return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		const embed = new Discord.MessageEmbed()
			.setTitle("Arguments")
			.setDescription(reply)
			.setFooter('<> = required argument and [] = opcional argument')
			.setThumbnail(crossmark);
		return message.channel.send(embed);
	}

	if (command.permissions) {
		if (command.permissions == 'OWNER') {
			if (!ownerID.includes(message.author.id)) {
				return;
			}
		}
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			const embed = new Discord.MessageEmbed()
				.setTitle("Permission")
				.setDescription("You don't have enough permission to do that!")
				.setThumbnail(crossmark);
			return message.channel.send(embed);
		}
	}

	if (command.cooldown) {
		let userCd = await cooldown.get(`cooldown - ${message.author.id}`);
		if (!userCd) {
			await cooldown.set(`cooldown - ${message.author.id}`, {});
			userCd = await cooldown.get(`cooldown - ${message.author.id}`);
		}
		if (userCd[command.name]) {
			if (userCd[command.name] < Date.now()) {
				userCd[command.name] = parseInt(ms(command.cooldown)) + parseInt(Date.now());
			}
			else { return message.reply(`Please wait more ${(userCd[command.name] - Date.now() < 1000) ? '0 seconds' : ms(userCd[command.name] - Date.now(), { long: true })} before using this command`) }
		}
		else {
			userCd[command.name] = parseInt(ms(command.cooldown)) + parseInt(Date.now());
		}
		await cooldown.set(`cooldown - ${message.author.id}`, userCd);
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		const embed = new Discord.MessageEmbed()
			.setTitle("Error")
			.setDescription('There was an error executing that command!')
			.setColor('#ff0000')
			.setThumbnail(crossmark);
		message.channel.send(embed).catch(function() { });
	}
});

client.login(process.env.CLIENT_TOKEN);
