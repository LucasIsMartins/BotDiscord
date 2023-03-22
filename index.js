
const { Client, Events, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const Eris = require('eris')
const dotenv = require('dotenv')

dotenv.config()
const { TOKEN } = process.env


//importação dos comandoss
const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname,'commands') //caminho dos comandos
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) 

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.commands = new Collection() 

for (const file of commandFiles ) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com data ou execute ausentes`);
    }
}

console.log(commandFiles)

//Login do bot
client.once(Events.ClientReady, c => {
	console.log(`Bot Online em: ${c.user.tag}`);

});
 client.login(TOKEN);


 //INTEREÇÕES COM O BOT
client.on(Events.InteractionCreate,  async interaction => {
    if (!interaction.isChatInputCommand()) return
    const  command = interaction.client.commands.get(interaction.commandName)
    if(!command) {
        console.error("Comando não encontrado")
        interaction.reply({ content: 'Esse comando que você tentou usar não existe, pare de ser burro! Para ver os comandos use **/tCriaHelp**', ephemeral: true })
        
        return
    }

    try {
        await command.execute(interaction)
        //console.log(interaction)
    }
    catch(error) {
        console.error(error)
        await interaction.reply('Houve um erro ao executar este comando')
    }
})


  

const botTheCria = new Eris(TOKEN);

botTheCria.on("ready", () => {
  console.log("Eris Status: OK!");
  
  
});


//MODULO ERIS JS 
botTheCria.on("messageCreate", async (msg) => {
    //THE CRIA HELP COMANDS
    if (msg.content === `/tc`) {
        
        function delay(ms) {
            return new Promise( r => setTimeout(r, ms))
        }
        const options = {
            messageReferenceID: msg.id,
            flags: 64
          };

        let embed = {
            title: `Lista de Comandos do Bot`,
            description: 'Utilize a / para iniciar os comandos. O bot dos cria possui alguns comandos secretos fiquem atentos a lista.',
            timestamp: new Date(),
            color: 0x7289DA,

            thumbnail: {
                url: 'https://i.ibb.co/HpX5wKf/6243-blurple-slashcommands.png'
            },

            fields: [
                {
                    name: `/previsao`, value: `Faz uma previsão sobre o futuro do arrombado mencionado.`, inline: false
                   
                },
                {
                   
                    name: `/pau:`, value: `Mostra pra todo mundo o tamanho do teu pau.`, inline: false
                },
            ],
          

        }
        return msg.channel.createMessage({embed: embed, messageReferenceID: msg.id})
        .then (async x => {
            await delay(10000)
            return x.delete()
        })
        
       
    }
    
    if(msg.content.toLowerCase() === "pipokinha") {
        return msg.channel.createMessage({content: "```fix\n:::::::::::::::::::::^^^^:::~JPB#BBGP&@@&#PYJY555555Y?7~^::::::::::::::::::\n:::::::::::::::::::~Y#@@G^^Y&@@@@@&GJB@@@@@@@BJ?7PBBGP55J!^^~!!!~^^::::::::\n::::::::::::::::::7B&@BJ~:~#@@@@@&&#?7#&#@@@@@5::?&@@#GPP555YJ77YY?~:::::::\n:::::::::::::::::!GG#G::~Y&@@&##GG&B?~YGP#&&@@@P7J5B@@&G5PP5!:::?PPJ~::::::\n:::::::::::::::::5BGP5::G&@&Y!Y&#Y?~^:::^7GBYG&@G55P&@&#P555~..:7PPP?^:::::\n::::::::::::::::~B&#B&Y:#BBJ~7&&Y:.......::?G?P&BYYG&&&BB55Y~:.:?PPP5~:::::\n::::::::::::::::J&&&&&&:?B?^!&#~.........:::!B5P5Y5B&#B#&P5Y~..^J5PP57:::::\n::::::::::::::::5&@&&&&~:77~#B~^^^:.....:^~^^P&P?Y5#BG#&&GYJ^..~Y555P?^::::\n::::::::::::::::B@@@&&#^:.!GY:^7?J~^:.::^?YJ?7#&YYP&B#&@@BY?:.:!55555J^::::\n:::::::::::::::^#@@@@&#::.7G^::~!!^:..:::^~^^~##JJB@#&@@@#Y?:.:755555J^::::\n:::::::::::::::?@@@@@@P:::PP^^:......::^....^7#PJJ#@BB@@@#J7:.:?55555J^::::\n::::::....:::::B@@@@@&7::.YP^^^:....:::^:..:~?BPJJB@#G@@@B!~:.:7YY5557:::::\n:::::......:::^&@@@@@B^::.~#!:::.......:...:^7BPJJ#@BG@@@?^^:.^JYYYYJ~:::::\n::::.......:::?@@@@@@G::::^G5:::::::::::^::^!YBY?5&@#B@@5:^^..!JYYYJ~::::::\n:::........::.5@@@@@@J:::::7Y:.:::::^::^^^!?JPG?J5&&&#&&^:^^.:!JYYY?^...:::\n:::.........::^#@@@@#^::...~J~....:....:~??JJ5J??Y&&BGG#^:^:.:!JYYYJ^...:::\n::..........:::#@@@&5:.....^5^........:~^:7J?J???Y&&BYG&B~:..:!JJYYY7^:..::\n::..........::~@@@@P~::...!P?::......:...:J5?????J&&BP#@@#~...^JJYYYY?^:..:\n::.......:~77!!JYYJ7!?7!7?!J!^^.....^:..:^7?!J?Y!!5&#5P@@@P~^^~?JJYYYY!:..:\n:.......~J?!!!~!7!^^~~^:::.:^^^^^^:~^..:::^?7^?GY^:YGY#@@@#J??JJJJJYYY?^:..\n:......:5?!~!~^!?7~^^~~^^:.:::^^^^~!~^:::::77^:~PP7^JG#@@@5^!?JJJJJYYYYJ!:.\n:......^Y?7~~~!!!?!~:^^~^:.::^^::::~7~^^:^!!^::::JBP?#G&@@#^:!JJJJJJYYYYY~.\n::.....^J!!~^~~!!7~^::::^..~~^^^^:.:~~^:^^^::^!~^:!!P@##@@@5:!JJJJJJYYYYY~.\n::.....^Y?~~^^??!!~~^::::.:^~~^:^^:.^:^^:::::^!^^:.~?&@&&@@Y^7JJJJJJJYYYY~.\n```", messageReferenceID: msg.id})

    }

    if(msg.content.toLowerCase() === "fufu") {
        return msg.channel.createMessage({content: `O ultimo romantico da terra ${':heart_eyes:'} `, messageReferenceID: msg.id})
    }

    if(msg.content.toLowerCase() === "fulano") {
        return msg.channel.createMessage({content: `O poderoso macho alfa! ${':sunglasses:'}`, messageReferenceID: msg.id})
  
    }

    if(msg.content.toLowerCase() === "fulaninho") {
        return msg.channel.createMessage({content: `Além de bonito é gostoso! ${':wink:'} `, messageReferenceID: msg.id})
    }

    if(msg.content.toLowerCase() === "mata") {
        return msg.channel.createMessage({content: "Opa, chamou um xipes?", messageReferenceID: msg.id})

    }

    if(msg.content.toLowerCase() === "carol") {
        return msg.channel.createMessage({content: " Xiiuu ela é troll", messageReferenceID: msg.id})

    }

    if(msg.content.toLowerCase() === "kzm") {
        return msg.channel.createMessage({content: "Escodam as suas bananas o xipes tá na area", messageReferenceID: msg.id})
    }
    
    if(msg.content.toLowerCase() === "boa sorte") {

        
        let embed = {
            title: ` Uma triste história de amor não correspondido ${':broken_heart:'}`,
            description: ` Ela é apaixonada pelo fulano mas não conta pra ninguém `,
            timestamp: new Date(),
            color: 0x7289DA,

            thumbnail: {
                url: "https://i.ibb.co/tmbQJNR/floatinghearts.gif"
            },
            image: {
                url: "https://i.ibb.co/QHT8NBW/image.png"
            },
            fields: [
                {
                    name: "Nem tudo está perdido", value: "Ainda há esperanca...", inline: true
                }
            ],
        }
        return msg.channel.createMessage({embed:embed, messageReferenceID: msg.id})   
    }

    //mencão bot
    if (msg.content === `<@1087122679141773442>`) {

        let embed = {
            title: `TheCria BOT ${':robot:'}`,
            description: 'Botzinho dos cria, utilize a / para iniciar os comandos. Para ver a lista de comandos digite: /tcHelp.',
            timestamp: new Date(),
            color: 0x7289DA,
            
            thumbnail: {
                url: 'https://i.ibb.co/fQPvKyd/0eec70f3-154b-42ab-9287-8b6eed2516f7-removebg-preview.png'
            },

            image: {
                url: "https://media.giphy.com/media/3oEjHUL3Vkg8v7Yt7G/giphy.gif"
            },

            fields: [
                {
                    name: `Desenvolvedor: `, value: `<@659209701304696852>`, inline: true
                   
                },
                {
                   
                    name: `Ajudante:`, value: `<@291234273367949314>`, inline: true
                },
                {
                   
                    name: `Código Fonte:`, value: `https://github.com/LucasIsMartins/Discord-Bot`, inline: false
                },
            ],
          

        }

        return msg.channel.createMessage({embed: embed, messageReferenceID: msg.id})
    }

    //mencao fulano
    if (msg.content === `<@291234273367949314>`) {
        const senha = (Math.floor(Math.random() * 100))
        let embed = {
            title: `Está ocupado comendo **Cu** de curioso ${':smiling_imp: '}`,
            description: 'Pegue uma senha e espere a sua vez.',
            timestamp: new Date(),
            color: 0x7289DA,
            thumbnail: {
                url: 'https://i.ibb.co/VTQKwnQ/coolpikachu.gif'
            },

            fields: [
                {
                    name: `Seu numero na fila é: ${senha}`, value: "Ja vai preparando o seu toba...", inline: true
                }
            ],

        }

        return msg.channel.createMessage({embed: embed, messageReferenceID: msg.id})
    }

        //mencao minha
        if (msg.content === `<@659209701304696852>`) {

            let embed = {
                title: `No momento ele está preso por roubar o coração da morena `,
                description: 'Injustamente julgado por ser muito **gostoso** e **disputado**.',
                timestamp: new Date(),
                color: 0x7289DA,
                thumbnail: {
                    url: 'https://i.ibb.co/Ny6m1BV/jail1.png'
                },
    
                fields: [
                    {
                        name: `#Liberdade vai cantar`, value: "Assim que possível ele vai te responder...", inline: true
                    }
                ],
    
            }
    
            return msg.channel.createMessage({embed: embed, messageReferenceID: msg.id})
        }
    

        //mencao boasorte
        // if (msg.content === `jeni`) {

        //     let embed = {
        //         title: `No momento ele está preso por roubar o coração da morena `,
        //         description: 'Injustamente julgado por ser muito gostoso e disputado.',
        //         timestamp: new Date(),
        //         color: 0x7289DA,
        //         thumbnail: {
        //             url: 'https://i.ibb.co/Ny6m1BV/jail1.png'
        //         },
    
        //         fields: [
        //             {
        //                 name: `#Liberdade vai cantar`, value: "Assim que possível ele vai te responder...", inline: true
        //             }
        //         ],
    
        //     }
    
        //     return msg.channel.createMessage({embed: embed, messageReferenceID: msg.id})
        // }
    

    //previsao

    if(msg.content.startsWith("/previsao")) {
        const milion = (Math.floor(Math.random() * 500))
        const days = (Math.floor(Math.random() * 365))
        
        const opcoes = [
            'Morrer de cu arrombado.',
            `Ganhar R$ ${milion} milhoes na mega sena em ${days} dias.`,
            'Pegar uma DST.',
            'Estudar direito em uma universidade pública.',
            'Ser preso por exesso de beleza.',
            'Ser pai de gêmeos.',
            'Casar com o Ricardão e ir morar no centro.',
            'Ser mãe de pet.',
            'Ser pai de pet',
            'Ser preso por não pagar penção dos filhos.',
            'Ficar rico vendendo foto da bunda.'
        ]

        const randomize =  Math.floor(Math.random() * opcoes.length)
        const destino = opcoes[randomize]

        let userMention = msg.mentions[0] //pega o usuário mecionado

        return msg.channel.createMessage({content: `O alinhamento da sua mãe gorda em relação aos outros planetas indica que o destino de **${userMention.username}** é: ${destino}`, messageReferenceID: msg.id})

    }


});

botTheCria.connect();

