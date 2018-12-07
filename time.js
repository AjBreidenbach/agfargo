const 
	second = 1000,
	minute = 60 * second,
	hour = 60 * minute,
	day = 24 * hour

module.exports.parse = s => {
	if (s == 'now' || s == 'today') return new Date()
	else if (s == 'yesterday') return new Date(Date.now() - day)

	result = new Date(s)
	if (result.getFullYear() == 2001) 
		result.setFullYear((new Date()).getFullYear())
	return result
}

module.exports.roundDay = d => new Date(Math.floor(d / day) * day)
module.exports.second = second
module.exports.minute = minute
module.exports.hour = hour
module.exports.day = day
