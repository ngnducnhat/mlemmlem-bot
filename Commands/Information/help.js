const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");

const {
    botColor,
    botName,
    botAvatar,
    botWebsite,
} = require("../../config.json");
const upload = require("../Features/upload");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription(`${botName} Commands`)
        .addStringOption((option) =>
            option
                .setName("commands")
                .setDescription("Choose feature")
                .setRequired(false)
                .addChoices(
                    { name: "Girl", value: "girl" },
                    { name: "Cat", value: "cat" },
                    { name: "Dog", value: "dog" },
                    { name: "Meme", value: "meme" },
                    { name: "Upload", value: "upload" }

                )
        ),
    execute(interaction, client) {
        const { options } = interaction;
        const type = options.getString("commands");
        const embed = new EmbedBuilder()
        switch (type) {
            case 'girl':
                embed.setImage("https://i.imgur.com/MvGWflR.gif")
                break;
            case 'cat':
                embed.setImage("https://i.imgur.com/xdHjxRj.gif")
                break;
            case 'dog':
                embed.setImage("https://i.imgur.com/0yEflJC.gif")
                break;
            case 'meme':
                embed.setImage("https://i.imgur.com/0bUKZgf.gif")
                break;
            case 'upload':
                embed.setImage("https://i.imgur.com/TNgGX28.gif")
                break;
            default:
                break;
        }

        embed.setColor(botColor).setAuthor({
            name: `${botName} command`,
            iconURL: botAvatar,
            url: botWebsite,
        }).setDescription(`
                - </girl:1072032931477987349> : Send \`girl\` images
                - </cat:1072804013197774878> : Send \`cat\` images
                - </dog:1072804013197774879> : Send \`dog\` images
                - </meme:1072804013197774880> : Send \`dog\` images

                - </upload:1072032931477987350> : Upload your image
            `);
        interaction.reply({ embeds: [embed] });
    },
};
