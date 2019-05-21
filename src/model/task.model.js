const awsDriver = require('../../config/aws.driver');
const uuid = require('uuid');

const dynamoDB = new awsDriver.DynamoDB();

const TaskDao = {}

TaskDao.insert = (task, callback) => {
	const id = task.id || uuid();
	dynamoDB.putItem({
		TableName: 'Tasks',
		Item: {
			"id": { S: id },
			"title": { S: task.title },
			"description": { S: task.description },
			"isPriority": { BOOL: task.isPriority },
			"isDone": { BOOL: task.isDone }
		}
	}, (err, data) => {
		if (err) {
			callback(err, null)
		} else {
			callback(null, {
				id,
				title: task.title,
				description: task.description,
				isPriority: task.isPriority,
				isDone: task.isDone
			})
		}
	});
}

TaskDao.listAll = (callback) => {
	dynamoDB.scan({ TableName: 'Tasks' }, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			const list = [];
			data.Items.forEach(item => {
				const task = {
					id: item.id.S,
					title: item.title.S,
					description: item.description.S,
					isPriority: item.isPriority.BOOL,
					isDone: item.isDone.BOOL,
				}
				list.push(task);
			});
			callback(null, list);
		}
	});
}

TaskDao.findTaskById = (id, callback) => {
	dynamoDB.getItem({
		TableName: 'Tasks',
		Key: {
			"id": { S: id }
		}
	}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			const item = data.Item;
			var task = null;
			if (item) {
				task = {
					id: item.id.S,
					title: item.title.S,
					description: item.description.S,
					isPriority: item.isPriority.BOOL,
					isDone: item.isDone.BOOL,
				}
			}
			callback(null, task)
		}
	});
}

TaskDao.remove = (id, callback) => {
	dynamoDB.deleteItem({
		TableName: 'Tasks',
		Key: {
			"id": { S: id }
		}
	}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, {
				message: 'deleted'
			});
		}
	})
}
module.exports = TaskDao