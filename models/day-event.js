const
	mongoose = require('mongoose')

module.exports = mongoose.model('DayEvent', (function (){
	let schema = new mongoose.Schema({
		driverId: String,
		vehicleId: String,
		odometer: Number,
		reeferHours: Number,
		event: {type: String, default: 'begin'},
		inspection: Number,
		timestamp: {type: Date, default: new Date()},
	})
	schema.methods.show = function(){ return `
**ID**: ${this._id}
**Vehicle**: ${this.vehicleId}
**Driver ID** ${this.driverId}
**Odometer**: ${this.odometer}
**ReeferHours**: ${this.reeferHours}
**Event**: ${this.event}
**Timestamp**: ${this.timestamp}
`}
	return schema
})())
