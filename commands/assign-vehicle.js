const Employee = require('../models/employee.js'), Vehicle = require('../models/vehicle.js')

module.exports = { 
	effect: 'moves driver to another vehicle',
	syntax: 'employee number . DOT number',
	minArgs: 2,
	exec: (args, msg) => {
		Employee.findOne({_id: args[0]}, (err, employee) => {
			if(employee == null) {
				msg.reply('Employee not registered'); return
			}
			Vehicle.exists(args[1], (_, yes) => {
				if (yes) {
					employee.vehicleId = args[1]
					employee.save((err, _) => {
						if(err){msg.reply(err._message); return}
						msg.reply(`${employee.name} has been assigned to ${args[1]}`)
					})
				} else {msg.reply('Vehicle not registered')}
			})
		})
	}
}
