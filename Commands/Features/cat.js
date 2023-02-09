const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");

const { botAvatar, botColor } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder().setName("cat").setDescription("Cat images"),
    async execute(interaction) {
        let imageData = require("../../data/catData.json");
        let images = Object.keys(imageData);
        let randomImage = images[Math.floor(Math.random() * images.length)];

        let author = imageData[randomImage].author;
        if (imageData[randomImage].isPublic === "false") {
            author = "-hidden user-";
        }

        const embed = new EmbedBuilder()
            .setColor(botColor)
            .setImage(imageData[randomImage].url)
            .setDescription(`🙀`)
            .setFooter({
                text: `Uploaded by ${author}`,
                iconURL: botAvatar,
            });
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("next-cat")
                .setLabel(`Next image`)
                .setStyle(ButtonStyle.Primary)
        );

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
            components: [row],
        });
    },
};
