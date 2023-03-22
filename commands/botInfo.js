const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boi') //Comando que seŕa mostrado no discord
        .setDescription('Mostra todos os comandos do bot dos cria'), //Descrição


    async execute(interaction) {
        await interaction.reply("POONG")
    }

}