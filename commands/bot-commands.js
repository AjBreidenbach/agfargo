
/*commands['file'] = (args, msg) =>
	msg.reply('file', {
		file: {name: 'file.txt', attachment: Buffer.from('Hello world')}
	})
*/
function assertAdmin(msg) {
	if (! admins.includes(msg.author.id)) {
		msg.reply('You must be an admin to use this command'); return false
	}
	return true
}

function assertMinimumArgs(args, min, msg) {
	if (args.length < min) msg.reply(`Incorrect number of arguments supplied (expected ${min}, but got ${args.length})`)
	return args.length >= min
}

let commands = {}
commands['show pending'] = require('./show-pending.js')
commands['show customer'] = require('./show-customer.js')
commands['cross'] = require('./cross.js')
commands['delete pending'] = require('./delete-pending.js')
commands['assign vehicle'] = require('./assign-vehicle.js')
commands['begin day'] = require('./begin-day.js')
commands['end day'] = require('./end-day.js')
commands['refuel'] = require('./refuel.js')


function displayCommand(commandName) {
	let command = commands[commandName]
	result = []
	result.push(`**${commandName}**`)
	if(command.effect) result.push(`**effect**: ${command.effect}`)
	if(command.syntax) result.push(`**syntax**: ${command.syntax}`)
	if(command.minArgs) result.push(`**minArgs**: ${command.minArgs}`)
	if(command.requiresAdmin) result.push(`**requiresAdmin**: ${command.requiresAdmin}`)
	return result.reduce( (acc, s) => acc + '\n' + s)
}
commands['help'] = {
	effect: 'show information on a command',
	syntax: 'command name (e.g. list)',
	minArgs: 1,
	exec: (args, msg) => msg.reply(
		commands[args[0]]?
			displayCommand(args[0]) :
			'command not found'
	)
}

commands['list'] = {
	exec: (_, msg) => msg.reply(Object.keys(commands).map(c => displayCommand(c)).reduce( (acc, s) => acc + '\n\n' + s)),
	effect: 'list available commands'
}

module.exports.registerAdmins = (_admins) =>
	admins = _admins

module.exports.exec = (args, msg) => {
	let commandName = args[0].toLowerCase()
	if (commandName in commands) {
		let 
			command = commands[commandName],
			commandArgs = args.slice(1)

		if (command.minArgs && command.minArgs > 0) {
			if (! assertMinimumArgs(commandArgs, command.minArgs, msg)) return
		}

		if (command.requiresAdmin) {
			if (! assertAdmin(msg)) return
		}
		command.exec(commandArgs, msg)
	}
	else msg.reply(`command ${args[0]} not found; type '.list' to view available commands`)
}

module.exports.register = (name, command) => commands[name] = command
