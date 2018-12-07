const Customer = require('../models/customer.js'), Order = require('../models/orders.js'), encoding = require('../encoding.js')

module.exports = {
	effect: 'shows incomplete customer orders',
	syntax: 'customer name (e.g. WittyBlueGorilla) | customer ID (e.g. 2701)',
	minArgs: 1,
	exec: (args, msg) => {
		Customer.getCustomer(encoding.fromCodename(args[0]), (err, customer) => {
			if(err) {msg.reply(err._message)}
			customer.pending((err, orders) => {
				if (err) {msg.reply(err._message)}
				for(order of orders) msg.reply(order.show())
			})
		})
	}
}
