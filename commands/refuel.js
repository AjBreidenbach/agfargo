const Employee = require('../models/employee.js')

module.exports =  {
	effect: 'writes a crossing record for vehicle trip log',
	syntax: 'odometer . gallons . cost (do not include $ sign) . location',
	minArgs: 4,
	exec: (args, msg) => {
		Employee.getEmployee(msg.author.id, (err, employee) => {
			if(err) {msg.reply(err._message); return}
			employee.refuel(args[0], args[1], args[2], args[3],
				(err, fuel) =>  msg.reply(err? err._message: fuel.show())
			)
		})
	}
}
