const
	mongoose = require('mongoose')

module.exports = mongoose.model('Fuel', (function (){
	let schema = new mongoose.Schema({
		driverId: String,
		vehicleId: String,
		odometer: Number,
		gallons: Number,
		cost: Number,
		location: String,
		timestamp: {type: Date, default: new Date()},
	})
	schema.methods.show = function(){ return `
**ID**: ${this._id}
**Vehicle**: ${this.vehicleId}
**Driver ID** ${this.driverId}
**Odometer**: ${this.odometer}
**Gallons**: ${this.gallons}
**Cost**: ${this.cost}
**Location**: ${this.location}
**Timestamp**: ${this.timestamp}
`}
	return schema
})())
