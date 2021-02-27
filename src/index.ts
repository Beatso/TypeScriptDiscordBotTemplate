import Commando from 'discord.js-commando'
import path from 'path'
import * as sqlite from 'sqlite'
import sqlite3 from 'sqlite3'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../.env') })

const client = new Commando.Client({
	owner: '634776327299399721'
})

client.registry

	// registers command groups
	.registerGroups([
		['main', 'Main commands'],
		['admin', 'Admin commands'],
		['bot', 'Meta commands']
	])

	// registers all built-in groups, commands, and argument types
	.registerDefaults()

	// registers all commands in the ./commands/ directory
	.registerCommandsIn(path.join(__dirname, 'commands'))

client.setProvider(
	sqlite.open({ filename: 'database.db', driver: sqlite3.Database })
		.then(db => new Commando.SQLiteProvider(db))
).catch(console.error)

client.on('ready', () => {

	console.log('Bot running!');

	(function startUpdatingStatus () {
		client.user?.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' }).catch(console.error) // update status
		setTimeout(() => startUpdatingStatus(), 3600000) // run again in an hour
	})()
	
})

client.login(process.env.bottoken)
