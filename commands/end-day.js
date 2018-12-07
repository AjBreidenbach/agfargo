const Employee = require('../models/employee.js')

module.exports =  {
	effect: 'writes a crossing record for vehicle trip log',
	syntax: 'odometer . reefer hours',
	minArgs: 2,
	exec: (args, msg) => {
		Employee.getEmployee(msg.author.id, (err, employee) => {
			if(err) {msg.reply(err._message); return}
			employee.endDay(args[0], args[1],
				(err, dayevt) => msg.reply( err?  err._message: dayevt.show())
			)
		})
	}
}
