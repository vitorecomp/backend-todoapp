const jwt = require('jsonwebtoken');
const secret = 'MUITOS_SEGREDOS'

module.exports = function (req, resp, next) {
	const token = req.headers['x-access-token'];

	try {
		jwt.verify(token, secret);
		next();
	} catch (e) {
		resp.status(500).send({ message: 'token invalido' })
	}
}