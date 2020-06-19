require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const config = { prefix: '!' };

const WelcomeService = require('./Services/Welcome');

client.on('ready', () => {
    client.user.setActivity(`Let's Code`);
});

client.on('guildMemberAdd', async member => {
    const welcomeService = new WelcomeService(member);

    await welcomeService.generateImage();
});

client.login(process.env.AUTH_TOKEN);