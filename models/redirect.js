const 
	mongoose = require('mongoose'),
	encoding = require('../encoding.js')

module.exports = mongoose.model('Redirect', (function() {
	let schema = new mongoose.Schema({
		customerId: Number,
		timestamp: {type: Date, default: new Date()},
		resource: String,
	})

	schema.methods.show = function(){return`
**ID**: ${this._id}
**Customer ID**: ${encoding.toCodename(this.customerId)}/${encoding.toHex(this.customerId)}
**Date**: ${this.timestamp? this.timestamp.toLocaleString(): undefined}
**Resource**: ${this.resource}
`}
	return schema
})())
