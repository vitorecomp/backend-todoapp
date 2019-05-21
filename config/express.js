const express = require('express')
const bodyParser = require('body-parser');


module.exports = function () {
	//instacia o express
	const app = express()

	//seta itens de parser
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	//add as rotas pelos controllers
	require('../src/route/task.route')(app)
	require('../src/route/basic.route')(app)

	return app
}