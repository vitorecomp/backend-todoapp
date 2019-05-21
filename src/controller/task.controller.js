const taskDAO = require('../model/task.model');

let Task = {}

Task.post = (request, response) => {
	const body = request.body;
	const task = {
		title: body.title,
		description: body.description,
		isDone: body.isDone,
		isPriority: body.isPriority
	};
	taskDAO.insert(task, (err, data) => {
		if (err) {
			console.log(err)
			response.status(500).send(err);
		} else {
			response.status(201).send(data);
		}
	});
}

Task.get = (request, response) => {
	taskDAO.listAll((err, data) => {
		if (err) {
			response.status(500).send(err);
		} else {
			response.send(data);
		}
	});
}

Task.getOne = (request, response) => {
	taskDAO.findTaskById(request.params.id, (err, task) => {
		if (task) {
			response.status(200);
			response.send(task);
		} else if (err) {
			response.status(500);
			response.send(err);
		} else {
			response.status(404);
			response.send();
		}
	});
}

Task.put = (request, response) => {
	const body = request.body;
	const task = {
		id: request.params.id,
		title: body.title,
		description: body.description,
		isDone: body.isDone,
		isPriority: body.isPriority
	};
	taskDAO.insert(task, (err, data) => {
		if (err) {
			response.status(500).send(err);
		} else {
			response.send(task);
		}
	});
}

Task.delete = (request, response) => {
	taskDAO.findTaskById(request.params.id, (err, task) => {
		if (err)
			response.status(500).send(err);
		if (!task)
			response.status(404).send();

		taskDAO.remove(request.params.id, (err, data) => {
			if (err)
				return response.status(500).send(err);

			response.status(200).send(task);
		});
	});
}

module.exports = Task