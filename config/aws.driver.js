const AWS = require('aws-sdk');

const isLocal = process.env['TODOMANAGERLOCAL']
if (!isLocal) {
	console.log('Production')
	AWS.config.update({ region: 'sa-east-1' });
	AWS.config.update({
		credentials: {
			accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
			secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
		}
	});
} else {
	AWS.config.update({
		endpoint: 'http://localhost:8000'
	});
}

module.exports = AWS;