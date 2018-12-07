const 
	mongoose = require('mongoose'),
	encoding = require('../encoding.js')

module.exports = mongoose.model('Customer', (function (){
	let schema = new mongoose.Schema({
		_id: Number,
		name: String,
		mapsUrl: String,
		status: String,
		creation: {type: Date, default: new Date()}
	}, {_id: false})
	schema.methods.getOrders = function(daterange, cb){
		daterange = daterange? daterange: {}
		return this.model('Order').find({customerId: this._id, orderDate: daterange}, cb)
	}
	schema.methods.pending = function(cb) {
		return this.model('Order').find(
			{customerId: this._id, $or:[{status: 'pending'}, {status: 'out'}, {status: 'low'}]}, 
		cb)}
	schema.methods.deletePending = function(cb) {
		return this.model('Order').deleteMany(
			{customerId: this._id, $or:[{status: 'pending'}, {status: 'out'}, {status: 'low'}]}, err => cb? cb(err): undefined
		)
	}

	schema.methods.show = function(){ return `
**Name**: ${this.name}
**Customer ID**: ${encoding.toCodename(this._id)}/${encoding.toHex(this._id)}
**Status**: ${this.status}
**Google Maps**: ${this.mapsUrl}
`}

	schema.statics.exists = function(id, cb) {
		return this.find({_id: id}, (err, res) => cb(err, res.length > 0))
	}
	schema.statics.getCustomer = function(id, cb) {
		return this.findOne({ _id: id }, cb)
	}
	return schema
})())

