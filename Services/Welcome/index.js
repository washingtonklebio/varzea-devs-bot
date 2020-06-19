require('dotenv').config();

const Jimp = require('jimp');

const Discord = require('discord.js');
const Helper = require('../../Helpers/Helper.js');

class WelcomeService {
    constructor(member) {
        this.client = new Discord.Client();
        this.member = member;
    }

    async generateImage() {
        const channel = this.member.guild.channels.cache.find(channel => channel.name === 'geral');

        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const mask = await Jimp.read('./assets/images/mask.png');
        const background = await Jimp.read('./assets/images/background.png');
        const username = this.member.user.username;
        const image = `${this.member.user.id}.png`;
        
        Jimp.read(this.member.user.defaultAvatarURL)
        .then(avatar => {
            avatar.resize(160, 160);
            mask.resize(160, 160);
            avatar.mask(mask);
            background.print(font, Helper.alignImageCenter(username), 170, username);
            background.composite(avatar, 71, 7).write(image);
            
            channel.send('', { files: [ image ] });

            Helper.removeDir(image);
        })
        .catch(err => {
            console.log('Não consegui fazer a imagem de boas vindas', err);
        });
    }
}

module.exports = WelcomeService;