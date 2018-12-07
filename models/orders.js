const 
	mongoose = require('mongoose'),
	encoding = require('../encoding.js')

module.exports = mongoose.model('Order', (function() {
	let schema = new mongoose.Schema({
		customerId: Number,
		orderDate: {type: Date, default: new Date()},
		requestedDelivery: Date,
		requestedCallback: Boolean,
		message: String,
		status: {type: String, default: 'pending'}
	})

	schema.methods.show = function(){return`
**ID**: ${this._id}
**Customer ID**: ${encoding.toCodename(this.customerId)}/${encoding.toHex(this.customerId)}
**Date**: ${this.orderDate? this.orderDate.toLocaleString(): undefined}
**Status**: ${this.status}
**Requested Delivery**: ${this.requestedDelivery?this.requestedDelivery.toLocaleString():undefined}
**Requested Callback**: ${this.requestedCallback}
**Message**: ${this.message}
`}
	return schema
})())
