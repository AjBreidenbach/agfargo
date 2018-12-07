const 
	path = require('path'),
	walk = require('walkdir'),
	pug = require('pug'),
	config = require('./config.js'),
	appdir = path.dirname(require.main.filename)

let templates = {}



walk.sync('./templates', 
	(path, stat) => {
		let qualifiedPathName = path.substring(appdir.length + 11, path.length - 4)
		templates[qualifiedPathName] = config.isDev?
			path :
			pug.compileFile(path)
	})

module.exports.render = (template, model) => {
	if (!(template in templates)) throw new Error(`Template ${template} not found`)
	return config.isDev?
		pug.renderFile(templates[template], model)
	:
		templates[template](model)
}

