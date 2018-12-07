const Employee = require('../models/employee.js')

module.exports =  {
	effect: 'writes a crossing record for vehicle trip log',
	syntax: 'state . odometer reading',
	minArgs: 2,
	exec: (args, msg) => {
		Employee.getEmployee(msg.author.id, (err, employee) => {
			if(err){msg.reply(err._message); return}
			employee.cross(args[0], args[1], 
				(err, cross) => {if(err) msg.reply(err._message)}
			)
		})
	}
}
