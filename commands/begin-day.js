const Employee = require('../models/employee.js')

module.exports =  {
	effect: 'writes a crossing record for vehicle trip log',
	syntax: 'odometer . reefer hours . [inspection number]',
	minArgs: 2,
	exec: (args, msg) => {
		let inspection = args.length > 2? args[2]: 0
		Employee.getEmployee(msg.author.id, (err, employee) => {
			if(err) {msg.reply(err._message); return}
			employee.beginDay(args[0], args[1], inspection,
				(err, dayevt) => msg.reply(err? err._message: dayevt.show())
			)
		})
	}
}
