const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pau') //Comando que seŕa mostrado no discord
        .setDescription('Mostra pra todo mundo o tamanho do teu pau.'), //Descrição


    async execute(interaction) {
        const tam = (Math.floor(Math.random() * 30))

        if (tam < 10) {
            await interaction.reply(`":straight_ruler: ${interaction.member.user}, Tem ${tam} cm de Pau, Amendoinzinho.`)
        }

        if (tam >10 &&  tam <= 15) {
            await interaction.reply(`":straight_ruler: ${interaction.member.user}, Tem ${tam} cm de Pau, Pau medio.`)
        }

        if (tam > 15 && tam <= 20 ) {
            await interaction.reply(`":straight_ruler: ${interaction.member.user}, Tem ${tam} cm de Pau, Roludo.`)
        }

        if (tam > 20) {
            await interaction.reply(`":straight_ruler: ${interaction.member.user}, Tem ${tam} cm de Pau, Vai pegar manga é? `)
        }
        
    }

}