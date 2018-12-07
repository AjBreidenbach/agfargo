const 
	mongoose = require('mongoose')

module.exports = mongoose.model('Crossing', (function (){
	let schema = new mongoose.Schema({
		driverId: String,
		vehicleId: String,
		state: String,
		odometer: Number,
		highways: String,
		timestamp: {type: Date, default: new Date()},
	})
	schema.methods.show = function(){ return `
**ID**: ${this._id}
**Vehicle**: ${this.vehicleId}
**State**: ${this.state}
**Odometer**: ${this.odometer}
**Highways**: ${this.highways? this.highways: 'none'}
**Timestamp**: ${this.timestamp}
`}
	return schema
})())

