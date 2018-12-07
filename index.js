let
	express = require('express'),
	mongoose = require('mongoose'),
	util = require('util'),
	Template = require('./templateloader.js'),
	encoding = require('./encoding.js'),
	Customer = require('./models/customer.js'), Order = require('./models/orders.js'), Redirect = require('./models/redirect.js'),
	botclient = require('./botclient.js')
	db = require('./db.js'),
	app = express()

app.use(express.static('public'))

app.get('/ag/:customercode', (req, res) => {
	let 
		customerId = encoding.fromCodename(req.params.customercode),
		order = new Order({customerId: customerId})
	Customer.exists(customerId, (err, yes) => {
		if(yes) {
			if(req.query.date){order.requestedDelivery = new Date(req.query.date)}
			if(req.query.callback) {order.requestedCallback = req.query.callback == 'on'}
			if(req.query.message) {order.message = req.query.message}
			if(req.query.low) {order.status = 'low'}
			else if(req.query.out) {order.status = 'out'}
			if (order.status == 'pending')
				res.send(Template.render('order', req.params))
			else
				res.redirect(`/agcomplete/${req.params.customercode}`)
				
		}
		else if(customerId == -1) res.send(Template.render('invalid'))
		else res.send(Template.render('unregistered', (req.params)))
		order.save(
			(err, newOrder) => botclient.hooks.order(newOrder)
		)

	})
})
app.get('/agcomplete/:customercode', (req, res) => {
	res.send(Template.render('complete', (req.params)))
})

app.get('/agredirect/review/:customercode', (req, res) => {
	let redirect = new Redirect({customerId: encoding.fromCodename(req.params.customercode), resource: 'review'})
	redirect.save(
		(err, newRedirect) => botclient.hooks.redirect(newRedirect)
	)
	
	res.redirect('https://maps.google.com/?cid=1148418502045668382')
})

app.get('/trip-report', (req, res) => {
	res.send(Template.render('trip-report'))
})

db.onload( _ => {
	app.listen(3000) 
	botclient.init()
})
