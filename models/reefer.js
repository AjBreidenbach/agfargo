const 
	mongoose = require('mongoose')

module.exports = mongoose.model('Reefer', (function (){
	let schema = new mongoose.Schema({
		vehicleId: String,
		hours: Number,
		timestamp: {type: Date, default: new Date()},
	})
	return schema
})())

