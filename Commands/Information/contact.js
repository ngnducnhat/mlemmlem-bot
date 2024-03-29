const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");

const { botName, botColor, botWebsite } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("contact")
        .setDescription("My information"),
    execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(botColor)
            .setTitle(`${botName}`)
            .setDescription(`
                Created by [@ducnhatnee#5811](${botWebsite}) :flag_vn:
                Thank you so much for using my bot.

                Contact me:
                - Discord : @ducnhatnee#5811
                - [Facebook](https://bit.ly/3ykbdSS?r=lp)
                - Email : nhaatjisme@gmail.com

                Donate:
                - [Paypal](https://www.paypal.com/paypalme/ngnducnhatt)
                - [Upvote](https://top.gg/bot/985549787946426368)
            `);
        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
