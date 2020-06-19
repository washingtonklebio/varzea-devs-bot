require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const config = { prefix: '!' };

const WelcomeService = require('./Services/Welcome');

client.on('ready', () => {
    client.user.setActivity(`Let's Code`);
    console.log('O bot está on-line');
});

client.on('guildMemberAdd', async member => {
    const welcomeService = new WelcomeService(member);

    await welcomeService.generateImage();
});

client.on('message', msg => {
	if(msg.content === "Olá!"){
		msg.reply('Olá meu amigo');
	}
});

client.login(process.env.AUTH_TOKEN);
