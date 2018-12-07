const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.AGMONGOCRED}@cluster0-shard-00-00-cmqqi.mongodb.net:27017,cluster0-shard-00-01-cmqqi.mongodb.net:27017,cluster0-shard-00-02-cmqqi.mongodb.net:27017/ag?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))


module.exports.onload = function(cb) {
	db.once('open',  _ => {
		cb()
	})
}
