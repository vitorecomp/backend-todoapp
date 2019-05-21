const isLoggedIn = require('../../config/auth')

module.exports = function (app) {
	const Task = require('../controller/task.controller')

	app.route('/tasks')
		.get(isLoggedIn, Task.get)
		.post(isLoggedIn, Task.post)

	app.route('/tasks/:id')
		.get(isLoggedIn, Task.getOne)
		.put(isLoggedIn, Task.put)
		.delete(isLoggedIn, Task.delete)
}
