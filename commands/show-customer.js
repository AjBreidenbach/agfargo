const Customer = require('../models/customer.js'), encoding = require('../encoding.js')
module.exports = {
	effect: 'displays customer record',
	syntax: 'customer name (e.g. WittyBlueGorilla) | customer ID (e.g. 2701)',
	minArgs: 1,
	exec: (args, msg) => {
		Customer.getCustomer(encoding.fromCodename(args[0]), (err, customer) => {
			if(err) msg.reply(err)
			else msg.reply(customer.show())
		})
	}
}
