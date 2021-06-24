module.exports={
	name: 'test',
	description: 'dev only',
	permissions: 'OWNER',
	async execute(message, args){
		if(message.author.id!='639599540512620544'&&message.author.id!='460429419404853248') return;
		message.channel.send(args||"No Args");
	}
}