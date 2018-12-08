const Customer = require('../models/customer.js'), encoding = require('../encoding.js')
module.exports = {
	effect: 'shows customers matching query',
	syntax: 'query string',
	minArgs: 1,
	exec: (args, msg) => {
		Customer.findCustomers(args[0], (err, customers) => {
			if(err) msg.reply(err)
			else msg.reply((_ => {
				if (customers.length == 0) return('no records found')
				let long = customers.map(customer => customer.show()).reduce( (acc, s) => acc + s)
				return long.length < 1900 ? long: customers.map(customer => customer.showMini()).reduce( (acc, s) => acc + s)
			})(), {split: true}
			)
		})
	}
}
