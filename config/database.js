const awsDriver = require('./aws.driver')
const dynamoDB = new awsDriver.DynamoDB();

const init = (resolve, reject) => {
	dynamoDB.listTables({}, (err, data) => {
		if (err) {
			reject(err)
		} else {
			if (data.TableNames.indexOf('Tasks') == -1) {
				dynamoDB.createTable({
					TableName: 'Tasks',
					AttributeDefinitions: [
						{ AttributeName: 'id', AttributeType: 'S' },
					],
					KeySchema: [
						{ AttributeName: 'id', KeyType: 'HASH' },
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1
					},
				}, (err, data) => {
					reject(err)
				})
			} else {
				resolve(err, { message: 'ok' });
			}
		}
	});
}

module.exports = async function () {
	await new Promise(function (resolve, reject) {
		init(resolve, reject)
	})
}