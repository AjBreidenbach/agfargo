const 
	mongoose = require('mongoose'),
	Crossing = require('./crossing.js'), DayEvent = require('./day-event.js'), Fuel = require('./fuel.js')

module.exports = mongoose.model('Employee', (function (){
	let schema = new mongoose.Schema({
		_id: Number,
		name: String,
		vehicleId: String,
		snowflake: String
	}, {_id: false})

	schema.methods.getVehicle = function(cb){
		return this.model('Vehicle').find({_id: this.vehicleId}, cb)
	}
	schema.methods.cross = function (state, odometer, highways, cb){
		new Crossing({
			driverId: this._id,
			vehicleId: this.vehicleId,
			state: state,
			highways: highways,
			odometer: odometer
		}).save(cb)
	}
	schema.methods.beginDay = function(odometer, reeferHours, inspection, cb) {
		new DayEvent({
			driverId: this._id,
			vehicleId: this.vehicleId,
			odometer: odometer,
			reeferHours: reeferHours,
			inspection: inspection
		}).save(cb)
	}
	schema.methods.endDay = function(odometer, reeferHours, cb) {
		new DayEvent({
			driverId: this._id,
			event: 'end',
			vehicleId: this.vehicleId,
			odometer: odometer,
			reeferHours: reeferHours
		}).save(cb)
	}
	schema.methods.refuel = function(odometer, gallons, cost, location, cb) {
		new Fuel({
			driverId: this._id,
			vehicleId: this.vehicleId,
			odometer: odometer,
			gallons: gallons,
			cost: cost,
			location: location
		}).save(cb)
	}

	schema.statics.getEmployee = function(snowflake, cb) {
		return this.findOne({snowflake: snowflake}, cb)
	}

	return schema
})())

