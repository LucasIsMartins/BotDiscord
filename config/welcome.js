module.exports = (client) => {
    const channelID = "1087218116603433072"
    client.on("guildMemberAdd", (member) => {
        console.log(member)

        const message = `Bem vindo <@${member.id} a esse zoologico!`
        const channel = member.guild.channels.cache.get(channelID)
        channel.send(message)
    })
}