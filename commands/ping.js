const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pedro') //Comando que seŕa mostrado no discord
        .setDescription('Rei'), //Descrição


    async execute(interaction) {
        await interaction.reply("POONG")
    }

}