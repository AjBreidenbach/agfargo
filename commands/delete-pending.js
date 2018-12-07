const Customer = require('../models/customer.js')
module.exports  = {
	effect: 'removes all orders pending; used soley for debugging purposes',
	syntax: 'customer name (e.g. WittyBlueGorilla) | customer ID (e.g. 2701)',
	minArgs: 1,
	requiresAdmin: true,
	exec: (args, msg) => {
		Customer.getCustomer(encoding.fromCodename(args[0]), (err, customer) => {
			if(err) {msg.reply(err._message); return}
			customer.deletePending()
		})
	}
}
