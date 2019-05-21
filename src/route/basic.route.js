const isLoggedIn = require('../../config/auth')

module.exports = function (app) {
	const Basic = require('../controller/basic.controller')

	app.route('/login')
		.post(Basic.login)

	app.route('/')
		.get(Basic.home)

}
