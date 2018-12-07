const 
	mongoose = require('mongoose')

module.exports = mongoose.model('Vehicle', (function (){
	let schema = new mongoose.Schema({
		_id: String,
		ownership: String,
		branch: {type: Number, default: 284}
	}, {_id: false})
	schema.statics.exists = function(id, cb) {
		return this.find({_id: id}, (err, res) => cb(err, res.length > 0))
	}

	return schema
})())

