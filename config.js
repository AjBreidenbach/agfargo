module.exports.isDev = (process.env.NODE_ENV || 'dev') == 'dev'
module.exports.isProd = ! exports.isDev
