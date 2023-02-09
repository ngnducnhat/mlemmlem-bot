const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = require("discord.js");
const { botColor, botWebsite, botAvatar } = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        const { customId } = interaction;
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                interaction.reply({ content: "outdated command" });
            }
            command.execute(interaction, client);
        }

        if (!interaction.isButton()) return;
        if (interaction.isButton()) {
            const { channelId } = interaction;

            // confirm image
            if (channelId == "1072036462574444604") {
                const { message } = interaction;

                const embed = new EmbedBuilder().setColor(botColor);

                let dataImage = message.embeds[0].data;

                let url = dataImage.image.url;
                let time = dataImage.timestamp;
                let imageName = dataImage.fields.find(
                    (field) => field.name === "Image name"
                ).value;
                let author = dataImage.fields.find(
                    (field) => field.name === "Author"
                ).value;
                let authorID = dataImage.fields.find(
                    (field) => field.name === "Author ID"
                ).value;
                let isPublic = dataImage.fields.find(
                    (field) => field.name === "isPublic"
                ).value;

                let data = {
                    [imageName]: {
                        url: url,
                        author: author,
                        time: time,
                        isPublic: isPublic,
                    },
                };
                fs.readFile(
                    `./data/${customId}Data.json`,
                    "utf-8",
                    (err, fileData) => {
                        if (err)
                            return interaction.reply({
                                embeds: [
                                    embed.setDescription("Read file error"),
                                ],
                            });

                        let jsonData = JSON.parse(fileData);
                        jsonData = { ...jsonData, ...data };

                        fs.writeFile(
                            `./data/${customId}Data.json`,
                            JSON.stringify(jsonData),
                            (err) => {
                                if (err)
                                    return interaction.reply({
                                        embeds: [
                                            embed.setDescription(
                                                "Write file error"
                                            ),
                                        ],
                                    });

                                let userMsg = client.users.cache.get(authorID);
                                userMsg.createDM().then((dmChannel) => {
                                    // Your picture had been added
                                    dmChannel.send({
                                        embeds: [
                                            embed
                                                .setDescription(
                                                    "Your picture had been added.\nThank you for your support in sharing an image with the image database. Have a nice day"
                                                )
                                                .setImage(url),
                                        ],
                                    });
                                });
                                message.react("1072921828315648122");
                                message.react("☑️");

                                interaction.reply({
                                    embeds: [
                                        embed.setDescription(
                                            `Add to ${customId}Data`
                                        ),
                                    ],
                                });
                            }
                        );
                    }
                );
            }
            if (
                customId == "next-girl" ||
                customId == "next-cat" ||
                customId == "next-dog" ||
                customId == "next-meme"
            ) {
                let linkData, des;
                switch (customId) {
                    case "next-girl":
                        linkData = `../../data/girlData.json`;
                        des = "🍑";
                        break;
                    case "next-cat":
                        linkData = `../../data/catData.json`;
                        des = "🙀";
                        break;
                    case "next-dog":
                        linkData = `../../data/dogData.json`;
                        des = "🐶";
                        break;
                    case "next-meme":
                        linkData = `../../data/memeData.json`;
                        des = "🤣";
                        break;
                }

                let imageData = require(linkData);
                let images = Object.keys(imageData);
                let randomImage =
                    images[Math.floor(Math.random() * images.length)];
                let author = imageData[randomImage].author;
                if (imageData[randomImage].isPublic === "false") {
                    author = "-hidden user-";
                }

                const embed = new EmbedBuilder()
                    .setColor(botColor)
                    .setImage(imageData[randomImage].url)
                    .setDescription(des)
                    .setFooter({
                        text: `Uploaded by ${author}`,
                        iconURL: botAvatar,
                    });
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(customId)
                        .setLabel(`Next image`)
                        .setStyle(ButtonStyle.Primary)
                );

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                    components: [row],
                });
            }
        }
    },
};
