import { MessageEmbed } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

module.exports = class InfoCommand extends Command {
	constructor(bot: CommandoClient) {
		super(bot, {
			name: 'about',
			aliases: ['info'],
			group: 'bot',
			memberName: 'about',
			description: 'Show info about the bot.',
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS']
		})
	}

	async run(msg: CommandoMessage) {
		const embed = new MessageEmbed()
			.setColor(msg.guild?.me!.displayHexColor || '#E74C3C')
			.setTitle(this.client.user!.username)
			.setAuthor(this.client.owners[0].username, this.client.owners[0].avatarURL()!, 'https://www.beatso.tk/')
			.setDescription('This is a bot description. Explain what your bot does!')
			.setThumbnail(this.client.user?.avatarURL()!)
			.addField('Support Server', '[Invite](https://discord.gg/bNcZjFe)', true)
		return msg.channel.send({ embed: embed})
	}
}
