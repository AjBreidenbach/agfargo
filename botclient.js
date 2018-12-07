const 
	encoding = require('./encoding.js'),
	Discord = require('discord.js'),
	Commands = require('./commands/bot-commands.js'),
	client = new Discord.Client(),
	Time = require('./time.js')
	commandSyntax = /^\s*\./

function parseCommand(cmd) {
	return cmd.split('.').map(s => s.trim()).filter(s => s.length > 0)
}

function log(message) {
	_log.send(message)
}

client.on('ready', _ => {
	_log = client.guilds.first().channels.filter(c => c.name =='log').first()
	log('discord client online')
	Commands.registerAdmins(client.guilds.first().roles.find( r=> r.name == 'Admin').members.map(m => m.user.id))
	Commands.register('uptime', {
		minArgs: 0,
		exec: (args, msg) => 
			msg.reply(`${(client.uptime / Time.hour).toFixed(2)} hrs`)
	})
})

client.on('message', msg => {
	if (msg.channel.name =='bot-commands' && commandSyntax.test(msg.content)) {
		let args = parseCommand(msg.content)
		if (args.length > 0)
			Commands.exec(args, msg)
	}
})

// secret s9wvpbz1kWmSmHytwCOe3LKPqfWUc4wH
module.exports.init = _ => 
	client.login(process.env.AGBOTKEY)

module.exports.hooks = {
	order: o => log(`
New order: ${o.show()}`),
	redirect: r => log(`
New redirect: ${r.show()}`)
}
