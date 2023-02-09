const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");

const { botAvatar, botColor, channelId } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("upload")
        .setDescription("Upload your image to owr community")
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription("Choose type of image")
                .setRequired(true)
                .addChoices(
                    { name: "Girl", value: "girl" },
                    { name: "Cat", value: "cat" },
                    { name: "Dog", value: "dog" },
                    { name: "Meme", value: "meme" }
                )
        )
        .addAttachmentOption((option) =>
            option
                .setName("image")
                .setDescription("Image Upload")
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("public")
                .setDescription("Public author uploaded true or false")
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const { options, user } = interaction;
        const type = options.getString("type");
        const image = options.getAttachment("image");
        let isPublic;
        if (options.getBoolean("public") != null) {
            isPublic = options.getBoolean("public");
        } else isPublic = true;

        let nameData = type + image.id;
        let url = image.url;
        let author = user.username + `#` + user.discriminator;

        const embedSuccess = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Uploaded success")
            .setDescription(
                `Thank you for support community with your image. Wait my Boss confirm this image, I will notify you as soon as possible after it is confirmed.`
            );

        const embedConfirm = new EmbedBuilder()
            .setColor(botColor)
            .setTitle(`${type}`)
            .setImage(`${url}`)
            .addFields(
                { name: "Type", value: `${type}`, inline: true },
                { name: "ID", value: `${image.id}`, inline: true },
                { name: "Image name", value: `${nameData}`, inline: true },
                { name: "Author", value: `${author}`, inline: true },
                { name: "Author ID", value: `${user.id}`, inline: true },
                { name: "isPublic", value: `${isPublic}`, inline: true }
            )
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("girl")
                .setLabel(`Girl`)
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("cat")
                .setLabel(`Cat`)
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("dog")
                .setLabel(`Dog`)
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("meme")
                .setLabel(`Meme`)
                .setStyle(ButtonStyle.Primary)
        );

        client.channels.cache.get(channelId).send({
            embeds: [embedConfirm],
            components: [row],
        });

        interaction.reply({
            embeds: [embedSuccess],
            ephemeral: true,
        });
    },
};
